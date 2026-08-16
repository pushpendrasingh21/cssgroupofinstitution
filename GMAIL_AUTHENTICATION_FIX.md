# Gmail Authentication Error - Solution

## Current Error
```
Error: Invalid login: 535-5.7.8 Username and Password not accepted
```

## Fix Required: Enable "Less Secure App Access"

Even with 2FA disabled, Gmail requires you to enable "Less secure app access" for third-party apps (like Nodemailer) to send emails.

### Steps to Enable:

1. **Go to Gmail Account Settings:**
   - Visit: https://myaccount.google.com/u/0/security
   - Sign in if prompted

2. **Find and Enable "Less secure app access":**
   - Scroll down to find "Less secure app access"
   - Click on it to expand the section
   - Toggle the switch to **ON** (green)
   - You should see: "Allow less secure apps: ON"

3. **Wait for Changes:**
   - Gmail may take 1-2 minutes to apply the changes
   - Do not proceed until you see the toggle is enabled

4. **Verify .env Configuration:**
   ```env
   EMAIL_USER=psinghss027@gmail.com
   EMAIL_PASSWORD=Singh@123
   ADMIN_EMAIL=cssgroupofinstitution@gmail.com
   PORT=3000
   ```

5. **Restart Backend Server:**
   Kill the current server and restart:
   ```bash
   npm run start:backend
   ```

6. **Test Email:**
   Submit the enquiry form at http://localhost:4200/enquiry

## Why This is Needed

Gmail has security restrictions:
- **With 2FA enabled:** Use App Passwords (16-character password)
- **With 2FA disabled:** Enable "Less secure app access" to use regular password
- **Never:** Send emails without one of these security measures enabled

## If Still Not Working

1. Check that "Less secure app access" shows **ON** (green toggle)
2. Try signing out and signing back into Gmail
3. Look for "Critical security alert" in Gmail and approve the login attempt
4. Wait a few more minutes and try again

## Alternative: Use App Passwords Instead

If you want to keep your account more secure, re-enable 2FA and use App Passwords:
1. Enable 2-Step Verification
2. Go to https://myaccount.google.com/apppasswords
3. Generate a 16-character App Password
4. Use this password in .env instead

