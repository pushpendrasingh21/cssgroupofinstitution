# Email Setup Guide

This guide will help you configure email sending for the CSS Group Angular Website.

## Prerequisites

- Node.js installed
- Gmail account (or another email service)
- Environment configuration file (.env)

## Gmail Configuration (Recommended)

### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account: https://myaccount.google.com/
2. Select "Security" from the left menu
3. Under "How you sign in to Google," enable 2-Step Verification

### Step 2: Generate App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer" (or your device)
3. Google will generate a 16-character password
4. Copy this password

### Step 3: Configure .env File

1. Open the `.env` file in the project root
2. Update the following values:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
ADMIN_EMAIL=cssgroupofinstitution@gmail.com
PORT=3000
```

Replace:
- `your-email@gmail.com` with your Gmail address
- `your-16-char-app-password` with the password generated in Step 2
- `cssgroupofinstitution@gmail.com` with the admin email (where enquiries will be sent)

## Running the Application

### Option 1: Run Frontend and Backend Separately

Terminal 1 - Start Backend:
```bash
npm run start:backend
```

Terminal 2 - Start Frontend:
```bash
npm start
```

### Option 2: Run Both Simultaneously

```bash
npm run start:all
```

## Testing Email Functionality

1. Open http://localhost:4200/ in your browser
2. Navigate to the Enquiry form
3. Fill in the form with valid data:
   - Name: Any name
   - Phone: 10-digit number starting with 6-9 (e.g., 9876543210)
   - Email: Your email (optional)
   - Course: Select a course
4. Click "Submit Enquiry"
5. Check your email inbox for the confirmation email

## API Endpoints

- `POST /api/send-enquiry` - Send enquiry form data and trigger emails
- `GET /api/health` - Check if server is running

## Email Templates

The system sends two emails:
1. **Admin Email**: Receives all enquiry details
2. **Student Email**: Sends confirmation to the student (if email provided)

## Troubleshooting

### "Failed to send enquiry" Error
- Verify EMAIL_USER and EMAIL_PASSWORD in .env
- Check that 2-Factor Authentication is enabled on Gmail
- Ensure the App Password is correct (16 characters)
- Gmail may block unusual login attempts - check Gmail security alerts

### Server Not Connecting
- Ensure PORT 3000 is not in use
- Check that backend is running: `npm run start:backend`
- Verify no firewall blocks localhost:3000

### Emails Not Received
- Check spam/junk folder
- Verify ADMIN_EMAIL is correct in .env
- Check server logs for errors

## Using Other Email Services

For non-Gmail services, update the `transporter` configuration in `server.js`:

```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

## Security Notes

- Never commit `.env` file to version control
- Keep EMAIL_PASSWORD secure
- Use environment variables in production
- Consider using SendGrid, Mailgun, or AWS SES for production
