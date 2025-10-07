import axios from "axios"
import userModel from "../models/userModel.js"
import FormData from "form-data"

export const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body
        const userId = req.userId

        console.log('User ID:', userId)
        console.log('Prompt:', prompt)
        console.log('ClipDrop API Key exists:', !!process.env.CLIPDROP_API_KEY)

        const user = await userModel.findById(userId)

        if (!user || !prompt) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid request" 
            })
        }

        if (user.creditBalance <= 0) {
            return res.status(402).json({ 
                success: false, 
                message: "Insufficient credits.", 
                creditBalance: user.creditBalance 
            })
        }

        // ✅ Create FormData for ClipDrop
        const formData = new FormData()
        formData.append('prompt', prompt)

        console.log('Sending request to ClipDrop API with new key...')

        // ✅ Make API request to ClipDrop
        const response = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            formData,
            {
                headers: {
                    'x-api-key': process.env.CLIPDROP_API_KEY || "bd39878b82d349e74157da512d3a3792171d6d689b50d8506be1ce51cbd3a53b945c5b78361e21eabf9a409beb0e96dc",
                    ...formData.getHeaders()
                },
                responseType: 'arraybuffer',
                timeout: 30000
            }
        )

        console.log('ClipDrop API response status:', response.status)
        console.log('Image data received, size:', response.data.length)

        // Convert to base64
        const base64Image = Buffer.from(response.data).toString('base64')
        const resultImage = `data:image/png;base64,${base64Image}`

        // Update user credits
        await userModel.findByIdAndUpdate(
            userId, 
            { $inc: { creditBalance: -1 } }
        )

        console.log('Image generated successfully for user:', userId)

        res.json({
            success: true, 
            message: "Image generated successfully", 
            creditBalance: user.creditBalance - 1, 
            resultImage: resultImage
        })

    } catch (error) {
        console.log('Generate image error details:')
        console.log('Error message:', error.message)
        console.log('Error status:', error.response?.status)
        console.log('Error data:', error.response?.data)
        
        if (error.response?.status === 401) {
            return res.status(401).json({
                success: false,
                message: "ClipDrop API key is invalid or expired."
            })
        }
        
        if (error.response?.status === 403) {
            return res.status(403).json({
                success: false,
                message: "ClipDrop API key revoked. Please get a new key."
            })
        }

        if (error.response?.status === 429) {
            return res.status(429).json({
                success: false,
                message: "API rate limit exceeded. Please try again later."
            })
        }

        if (error.code === 'ECONNABORTED') {
            return res.status(408).json({
                success: false,
                message: "Request timeout. Please try again."
            })
        }

        res.status(500).json({ 
            success: false, 
            message: "Image generation failed. Please try again." 
        })
    }
}

// ✅ Test endpoint for ClipDrop
export const testClipDropAPI = async (req, res) => {
    try {
        console.log('Testing ClipDrop API with new key...')
        
        const formData = new FormData()
        formData.append('prompt', 'a beautiful sunset over mountains')

        const response = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            formData,
            {
                headers: {
                    'x-api-key': process.env.CLIPDROP_API_KEY || "bd39878b82d349e74157da512d3a3792171d6d689b50d8506be1ce51cbd3a53b945c5b78361e21eabf9a409beb0e96dc",
                    ...formData.getHeaders()
                },
                responseType: 'arraybuffer'
            }
        )

        console.log('ClipDrop API test successful, image size:', response.data.length)

        res.json({ 
            success: true, 
            message: "ClipDrop API is working with new key!",
            imageSize: response.data.length
        })
    } catch (error) {
        console.log('ClipDrop API test error:', error.message)
        console.log('Status:', error.response?.status)
        
        res.json({ 
            success: false, 
            message: "ClipDrop API test failed",
            error: error.message,
            status: error.response?.status
        })
    }
}