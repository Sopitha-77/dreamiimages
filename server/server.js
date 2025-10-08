import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRoutes from './routes/userRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://dreamiimages-p4k2b6a3e-sopithas-projects.vercel.app'
  ],
  credentials: true
}));

// Connect Database
connectDB();

// Register routes
app.use('/api/user', userRoutes);
app.use('/api/image', imageRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'DremiImages API is working!' });
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
});

export default app;