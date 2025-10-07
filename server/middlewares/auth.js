import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    try {
        // ✅ FIX: Get token from Authorization header (not req.header)
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false, 
                message: "No authentication token, access denied. Login again"
            });
        }

        // ✅ Extract the token (remove "Bearer " prefix)
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false, 
                message: "Invalid token format"
            });
        }

        // ✅ Verify token
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ FIX: Check the correct property name (userId, not id)
        // Your JWT tokens use "userId" based on your login/register functions
        if (!tokenDecode.userId) {
            return res.status(401).json({
                success: false, 
                message: "Invalid token payload"
            });
        }

        // ✅ FIX: Attach to req object (not req.body) and use consistent naming
        req.userId = tokenDecode.userId;
        
        // ✅ FIX: Move next() inside try block
        next();

    } catch (error) {
        // ✅ FIX: Proper error handling
        console.log('Auth middleware error:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false, 
                message: "Invalid token"
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false, 
                message: "Token expired. Please login again"
            });
        }

        return res.status(500).json({
            success: false, 
            message: "Authentication failed"
        });
    }
}

export default userAuth;