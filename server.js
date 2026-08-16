const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
});

// Email endpoint
app.post('/api/send-enquiry', async (req, res) => {
  try {
    const { name, phone, email, course, city, qualification, message } = req.body;

    // Validate required fields
    if (!name || !phone || !course) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'pushpendra.singh465@gmail.com',
      subject: `New Enquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #06183b;">New Student Enquiry</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email || 'N/A'}</p>
            <p><strong>Course:</strong> ${course}</p>
            <p><strong>City:</strong> ${city || 'N/A'}</p>
            <p><strong>Qualification:</strong> ${qualification || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <p>${message || 'No message provided'}</p>
            <p><small style="color: #666;">Received on: ${new Date().toLocaleString()}</small></p>
          </div>
        </div>
      `
    };

    // Welcome Email to student
    const welcomeMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to CSS Group of Institutions - Your Enquiry Received!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #06183b 0%, #0f2d5c 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Welcome to CSS Group!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">We're excited to help you start your journey</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #ddd;">
            <h2 style="color: #06183b; margin-top: 0;">Hi ${name},</h2>
            
            <p style="color: #333; line-height: 1.6;">
              Thank you for reaching out to <strong>CSS Group of Institutions</strong>! We're thrilled that you're interested in our <strong>${course}</strong> program.
            </p>
            
            <p style="color: #333; line-height: 1.6;">
              We have received your enquiry and will review your information carefully. Our admissions team will contact you shortly at <strong>${phone}</strong> to discuss your academic goals and answer any questions you may have.
            </p>
            
            <div style="background: #f0f7ff; padding: 20px; border-left: 4px solid #06183b; margin: 20px 0; border-radius: 4px;">
              <h3 style="color: #06183b; margin-top: 0;">What's Next?</h3>
              <ul style="color: #333; line-height: 1.8;">
                <li>Our team will contact you within 24 hours</li>
                <li>We'll provide detailed information about the ${course} program</li>
                <li>Discuss admission requirements and process</li>
                <li>Answer all your questions about campus and facilities</li>
              </ul>
            </div>
            
            <p style="color: #333; line-height: 1.6;">
              If you need any immediate assistance, feel free to reach out to us:
            </p>
            
            <div style="background: #fff3cd; padding: 15px; border-radius: 4px; margin: 15px 0;">
              <p style="margin: 0; color: #333;"><strong>📞 Call us:</strong></p>
              <p style="margin: 5px 0 0 0; color: #333;">7054056745 | 9540498925</p>
              <p style="margin: 10px 0 0 0; color: #333;"><strong>✉ Email:</strong> cssgroupofinstitution@gmail.com</p>
              <p style="margin: 5px 0 0 0; color: #333;"><strong>🌐 Website:</strong> cssedu.co.in</p>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-top: 30px;">
              Best regards,<br>
              <strong style="color: #06183b;">CSS Group of Institutions</strong><br>
              <small>Empowering students with quality education and career-focused learning</small>
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
            <p>© 2026 CSS Group of Institutions. All Rights Reserved.</p>
          </div>
        </div>
      `
    };

    // Send admin email
    console.log('Sending admin email to:', adminMailOptions.to);
    await transporter.sendMail(adminMailOptions);
    console.log('Admin email sent successfully');

    // Send welcome email to student if email is provided
    if (email) {
      console.log('Sending welcome email to:', email);
      await transporter.sendMail(welcomeMailOptions);
      console.log('Welcome email sent successfully to:', email);
    }

    res.json({ 
      success: true, 
      message: 'Enquiry submitted successfully! Check your email for confirmation.' 
    });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      error: 'Failed to send enquiry: ' + error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`
    ╔════════════════════════════════════════════╗
    ║   CSS Group Email Server Starting...       ║
    ║   Port: ${PORT}                                ║
    ║   Email: ${process.env.EMAIL_USER}         ║
    ╚════════════════════════════════════════════╝
  `);
  console.log('Server is ready to receive enquiries!');
});
