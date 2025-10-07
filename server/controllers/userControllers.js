// controllers/userController.js
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "../utils/emailService.js"; // Import the email service

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email"
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with 10 free credits
    const userData = {
      name,
      email,
      password: hashedPassword,
      creditBalance: 10 // Add free credits
    };

       const newUser = new userModel(userData);
    const user = await newUser.save();

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    console.log('📧 Calling sendWelcomeEmail for:', email);
    
    // Send welcome email
    sendWelcomeEmail(email, name)
      .then(sent => {
        if (sent) {
          console.log('🎉 Email delivery confirmed for:', email);
        } else {
          console.log('💥 Email delivery failed for:', email);
        }
      })
      .catch(err => {
        console.error('🔥 Email sending promise rejected:', err);
      });

    // Return response
    res.status(201).json({ 
      success: true, 
      message: "User registered successfully! Welcome email sent.",
      token, 
      user: { 
        id: user._id,
        name: user.name,
        email: user.email,
        creditBalance: user.creditBalance
      },
      credits: user.creditBalance
    });
  } catch (error) {
    console.log("Registration error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and password are required" 
      });
    }

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid email or password" 
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid email or password" 
      });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    // Optional: Send welcome email if it's their first login
    if (!user.lastLogin) {
      sendWelcomeEmail(email, user.name)
        .then(sent => {
          if (sent) {
            console.log('✅ Welcome email sent to new user:', email);
          }
        })
        .catch(console.error);
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Return response
    res.json({ 
      success: true, 
      message: "Login successful",
      token, 
      user: { 
        id: user._id,
        name: user.name, 
        email: user.email,
        creditBalance: user.creditBalance
      } 
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};

const userCredits = async (req, res) => {
  try {
    // ✅ Get userId from JWT token (more secure than req.body)
    const userId = req.userId; // Set by auth middleware

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.json({ 
      success: true, 
      credits: user.creditBalance, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        creditBalance: user.creditBalance
      }
    });

  } catch (error) {
    console.log('User credits error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};

export { registerUser, loginUser, userCredits };