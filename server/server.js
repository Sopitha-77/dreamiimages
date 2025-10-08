import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRoutes from './routes/userRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

const app = express();

// Middleware
app.use(express.json());

// Enhanced CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'https://dreamiimages-p4k2b6a3e-sopithas-projects.vercel.app',
      'https://dreamiimages-h7b5xt78l-sopithas-projects.vercel.app',
      'https://dreamiimages-git-main-sopitha-77.vercel.app',
      'https://dreamiimages-sopitha-77.vercel.app',
      /\.vercel\.app$/ // Allow all Vercel deployments
    ];
    
    // Check if the origin matches any allowed pattern
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return origin === allowed;
      } else if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('CORS blocked for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight requests
app.options('*', cors());

// Connect Database
connectDB();

// Register routes
app.use('/api/user', userRoutes);
app.use('/api/image', imageRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'DremiImages API is working!' });
});

// Debug route to check CORS
app.get('/debug-cors', (req, res) => {
  res.json({
    message: 'CORS is working!',
    origin: req.headers.origin,
    allowed: true,
    timestamp: new Date().toISOString()
  });
});

// Test email route
app.get('/test-email', async (req, res) => {
  try {
    const { email = 'sopithasopitha7@gmail.com' } = req.query;
    const { sendWelcomeEmail } = await import('./utils/emailService.js');
    
    console.log('🧪 Testing email to:', email);
    const sent = await sendWelcomeEmail(email, 'Test User');
    
    if (sent) {
      res.json({ 
        success: true, 
        message: `Test email sent to ${email}! Check inbox and spam folder.` 
      });
    } else {
      res.json({ 
        success: false, 
        message: `Failed to send test email to ${email}.` 
      });
    }
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Test email failed: ' + error.message 
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 CORS enabled for Vercel deployments`);
});

export default app;