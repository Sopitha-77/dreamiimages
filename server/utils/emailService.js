// Use SendGrid API directly instead of SMTP
console.log('📧 Email service loading with SendGrid API...');
console.log('🔧 SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? `✅ SET` : '❌ NOT SET');

const sendWelcomeEmail = async (userEmail, userName = 'User') => {
  try {
    console.log('📧 Starting email send process with SendGrid API...');
    console.log('📧 Recipient:', userEmail);

    const emailData = {
      personalizations: [
        {
          to: [{ email: userEmail }],
          subject: 'Welcome to DremiImages - Unleash Your AI Creativity!'
        }
      ],
      from: { email: 'hello@dremiimages.com', name: 'DremiImages' },
      content: [
        {
          type: 'text/html',
          value: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f9f9f9; }
                    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; color: white; }
                    .content { padding: 40px 30px; }
                    .step { background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #667eea; }
                    .footer { text-align: center; padding: 30px; background: #2c3e50; color: #ecf0f1; font-size: 14px; }
                    .btn { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 35px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; margin: 20px 0; }
                    .credit-badge { background: #e8f4fd; color: #2c3e50; padding: 10px 20px; border-radius: 20px; font-weight: bold; display: inline-block; margin: 15px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin: 0; font-size: 32px;">🎨 Welcome to DremiImages!</h1>
                        <p style="margin: 10px 0 0; font-size: 18px; opacity: 0.9;">Hi <strong>${userName}</strong>, ready to create magic?</p>
                    </div>
                    
                    <div class="content">
                        <h2 style="color: #2c3e50; margin-bottom: 25px;">Your Creative Journey Begins Now</h2>
                        
                        <div class="step">
                            <h3 style="color: #667eea; margin-top: 0;">🚀 Get Started in 3 Simple Steps</h3>
                            <p><strong>1. Explore Templates:</strong> Browse our AI-powered image styles</p>
                            <p><strong>2. Create & Customize:</strong> Add your prompts and generate unique images</p>
                            <p><strong>3. Download & Share:</strong> Get high-quality results instantly</p>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <div class="credit-badge">
                                🎁 You received <strong>5 free credits</strong> to start creating!
                            </div>
                            <br>
                            <a href="${process.env.FRONTEND_URL}" class="btn">Start Creating Now →</a>
                        </div>
                        
                        <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 25px 0;">
                            <h4 style="color: #2c3e50; margin-top: 0;">💡 Pro Tip</h4>
                            <p style="margin: 0;">Use descriptive prompts for better results. Example: "A majestic dragon flying over medieval castle at sunset, digital art"</p>
                        </div>
                        
                        <p style="color: #666; font-size: 14px;">Need assistance? Our support team is here to help you create amazing content!</p>
                    </div>
                    
                    <div class="footer">
                        <p style="margin: 0 0 10px;">&copy; 2024 DremiImages. All rights reserved.</p>
                        <p style="margin: 0; font-size: 12px; opacity: 0.8;">
                            Transform your ideas into stunning visuals with AI-powered creativity.
                        </p>
                        <p style="margin: 10px 0 0; font-size: 12px; opacity: 0.6;">
                            If you didn't create an account, please ignore this email.
                        </p>
                    </div>
                </div>
            </body>
            </html>
          `
        }
      ]
    };

    console.log('📧 Sending request to SendGrid API...');
    
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (response.ok) {
      console.log('✅ Email sent successfully with SendGrid API!');
      return true;
    } else {
      const errorText = await response.text();
      console.error('❌ SendGrid API failed:', response.status, errorText);
      return false;
    }
  } catch (error) {
    console.error('❌ SendGrid API failed with exception:', error.message);
    return false;
  }
};

export { sendWelcomeEmail };