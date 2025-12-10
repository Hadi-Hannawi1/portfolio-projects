# 📧 Form Integration Setup Guide

Complete instructions for connecting the contact form to email submission services.

---

## Table of Contents

- [Overview](#overview)
- [Option 1: Formspree (Recommended)](#option-1-formspree-recommended)
- [Option 2: EmailJS](#option-2-emailjs)
- [Option 3: Custom Backend API](#option-3-custom-backend-api)
- [Testing Your Form](#testing-your-form)
- [Troubleshooting](#troubleshooting)

---

## 📋 Overview

The contact form in this landing page requires a backend service to handle form submissions and send emails. Three options are provided:

| Service | Cost | Ease of Setup | Features | Best For |
|---------|------|---------------|----------|----------|
| **Formspree** | Free (50/month) | ⭐⭐⭐⭐⭐ | Simple, reliable | Most users |
| **EmailJS** | Free (200/month) | ⭐⭐⭐⭐ | Client-side only | No backend |
| **Custom Backend** | Varies | ⭐⭐ | Full control | Developers |

---

## 🟢 Option 1: Formspree (Recommended)

**Best for**: Beginners, quick setup, free tier available

### Why Formspree?

✅ No backend code required
✅ Spam protection included
✅ Email notifications
✅ File uploads supported
✅ Dashboard to view submissions
✅ Auto-responder emails
✅ 50 submissions/month (free)

### Step-by-Step Setup

#### 1. Create Formspree Account

- Go to [https://formspree.io](https://formspree.io)
- Click "Get Started" or "Sign Up"
- Sign up with email or GitHub
- Verify your email address

#### 2. Create a New Form

- Click "New Form" button
- **Form name**: Digital Growth Studio Contact
- **Email**: Enter the email where you want to receive submissions
  - Example: `hadi.hennawi2005@gmail.com`
- Click "Create Form"

#### 3. Get Your Form ID

After creating, you'll see your form endpoint:

```
https://formspree.io/f/YOUR_FORM_ID
```

**Example**: `https://formspree.io/f/xwpevnba`

Copy this URL - you'll need it in the next step.

#### 4. Update JavaScript Code

Open `js/main.js` and find line ~450:

**Before** (current code):
```javascript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
```

**After** (your form ID):
```javascript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwpevnba'; // Replace with YOUR form ID
```

#### 5. Test Your Form

1. Open your website
2. Go to the contact section
3. Fill out the form with test data
4. Click "Send Message"
5. Check your email for the submission
6. Check Formspree dashboard for the submission

### Configure Form Settings (Optional)

#### Enable Auto-Responder

1. Go to Formspree dashboard
2. Click on your form
3. Go to "Settings" tab
4. Scroll to "Auto-Responder"
5. Enable and customize the message:

```
Subject: Thank you for contacting Digital Growth Studio!

Body:
Hi {name},

Thank you for reaching out to us. We've received your message and will get back to you within 24 hours.

In the meantime, feel free to check out our portfolio and recent projects.

Best regards,
Digital Growth Studio Team
```

#### Add Spam Protection

1. In form settings, go to "Spam Protection"
2. Enable "reCAPTCHA" or "Honeypot"
3. For reCAPTCHA:
   - Get keys from [Google reCAPTCHA](https://www.google.com/recaptcha)
   - Add site key to Formspree settings

#### Custom Success URL

Redirect users after form submission:

1. In form settings, find "Redirect URL"
2. Enter: `https://yoursite.com/thank-you.html`
3. Create a thank you page (optional)

### Formspree Free Tier Limits

- **50 submissions/month**
- **1 active form**
- **Email notifications**
- **Basic spam filtering**

**Upgrade** to Pro ($10/month) for:
- Unlimited submissions
- Unlimited forms
- Advanced spam protection
- File uploads
- Integrations (Zapier, Google Sheets, etc.)

---

## 🔵 Option 2: EmailJS

**Best for**: Client-side email sending, no backend required

### Why EmailJS?

✅ Send emails directly from JavaScript
✅ No server required
✅ Multiple email services supported (Gmail, Outlook, etc.)
✅ Template system
✅ 200 emails/month (free)

### Step-by-Step Setup

#### 1. Create EmailJS Account

- Go to [https://www.emailjs.com](https://www.emailjs.com)
- Click "Sign Up"
- Create account with email
- Verify email address

#### 2. Add Email Service

- Go to "Email Services" in dashboard
- Click "Add New Service"
- Choose your email provider:
  - **Gmail** (recommended for testing)
  - Outlook
  - Yahoo
  - Custom SMTP
- Click "Connect Account"
- Follow authorization steps

**For Gmail**:
1. Click "Connect Account"
2. Allow EmailJS to send emails
3. Service ID will be generated (example: `service_abc123`)

#### 3. Create Email Template

- Go to "Email Templates"
- Click "Create New Template"
- **Template Name**: Contact Form Submission
- **Template ID**: Will be auto-generated (example: `template_xyz789`)

**Template Content**:

```
Subject: New Contact Form Submission from {{name}}

From Name: {{name}}
Email: {{email}}
Phone: {{phone}}
Company: {{company}}
Service Needed: {{service}}
Budget: {{budget}}

Message:
{{message}}

---
Sent from Digital Growth Studio website
```

**Variables to add**:
- `{{name}}`
- `{{email}}`
- `{{phone}}`
- `{{company}}`
- `{{service}}`
- `{{budget}}`
- `{{message}}`

Click "Save".

#### 4. Get Your Credentials

You'll need three things:
1. **Public Key** (User ID) - Found in "Account" → "General"
2. **Service ID** - From Email Services (example: `service_abc123`)
3. **Template ID** - From Email Templates (example: `template_xyz789`)

#### 5. Add EmailJS Library

Add this script **before** your `main.js` in `index.html`:

```html
<!-- Add before </body> tag -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    (function(){
        emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your public key
    })();
</script>
<script src="js/main.js"></script>
```

#### 6. Update JavaScript Code

Replace the form submission code in `js/main.js` (starting around line ~450):

**Replace this entire block**:

```javascript
try {
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
    
    const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    if (response.ok) {
        // Show success message
        successMessage.style.display = 'flex';
        contactForm.reset();
        // ... rest of success code
    }
}
```

**With this**:

```javascript
try {
    // EmailJS configuration
    const serviceID = 'service_abc123'; // Replace with your Service ID
    const templateID = 'template_xyz789'; // Replace with your Template ID
    
    // Send email using EmailJS
    const response = await emailjs.send(serviceID, templateID, {
        name: data.name,
        email: data.email,
        phone: data.phone || 'Not provided',
        company: data.company || 'Not provided',
        service: data.service,
        budget: data.budget || 'Not specified',
        message: data.message,
        reply_to: data.email
    });
    
    console.log('EmailJS Response:', response);
    
    if (response.status === 200) {
        // Show success message
        successMessage.style.display = 'flex';
        contactForm.reset();
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    } else {
        throw new Error('Email sending failed');
    }
}
```

#### 7. Test Your Form

1. Open your website
2. Fill out the contact form
3. Submit
4. Check your email (the one connected to EmailJS service)
5. Check EmailJS dashboard for delivery status

### EmailJS Free Tier Limits

- **200 emails/month**
- **2 email templates**
- **1 email service**
- **Basic rate limiting**

**Upgrade** ($7-15/month) for:
- More emails
- Multiple services
- Custom rate limits
- Priority support

---

## 🔧 Option 3: Custom Backend API

**Best for**: Developers with existing backend or specific requirements

### Requirements

- Backend server (Node.js, Python, PHP, etc.)
- Email sending library
- API endpoint to receive POST requests

### Example: Node.js + Express + Nodemailer

#### 1. Create Backend Server

```javascript
// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password' // Use app password, not regular password
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, company, service, budget, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Required fields missing' });
    }
    
    // Email content
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'hadi.hennawi2005@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `,
        replyTo: email
    };
    
    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

#### 2. Update Frontend Code

In `js/main.js`, update the fetch URL:

```javascript
const response = await fetch('https://your-api-url.com/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
});
```

#### 3. Deploy Backend

- Deploy to Heroku, Railway, Render, or your server
- Update frontend with deployed API URL

### Other Backend Options

- **PHP** - Use `mail()` function or PHPMailer
- **Python** - Flask/Django with SMTP library
- **Serverless** - AWS Lambda, Google Cloud Functions, Netlify Functions

---

## ✅ Testing Your Form

### Test Checklist

- [ ] Fill out form with valid data → Should succeed
- [ ] Leave required fields empty → Should show error
- [ ] Enter invalid email → Should show error
- [ ] Enter short message (< 20 chars) → Should show error
- [ ] Submit valid form → Should show success message
- [ ] Check email inbox → Should receive submission
- [ ] Test on mobile device → Should work correctly

### Test Data

```
Name: John Doe
Email: test@example.com
Phone: +1 234 567 8900
Company: Test Company Inc.
Service: Web Development
Budget: $5,000 - $10,000
Message: This is a test message from the contact form. I would like to discuss a potential project.
```

### Debugging Tips

**Form not submitting**:
1. Open browser console (F12)
2. Look for error messages
3. Check Network tab for failed requests
4. Verify API endpoint URL is correct

**Emails not received**:
1. Check spam folder
2. Verify email address in service settings
3. Check service dashboard for delivery logs
4. Test with different email addresses

**Validation not working**:
1. Check `js/main.js` loaded correctly
2. Verify no JavaScript errors in console
3. Test each field individually

---

## 🐛 Troubleshooting

### Formspree Issues

**Problem**: "Form not found" error

**Solution**:
- Double-check form ID is correct
- Ensure you're using the full URL: `https://formspree.io/f/YOUR_ID`
- Verify form exists in your Formspree dashboard

**Problem**: Submissions not appearing in dashboard

**Solution**:
- Check email for verification link (first submission)
- Verify your account is active
- Check spam folder for notification emails

### EmailJS Issues

**Problem**: "Public key invalid" error

**Solution**:
- Copy public key from EmailJS dashboard (Account → General)
- Paste exactly (no extra spaces)
- Reinitialize: `emailjs.init("YOUR_KEY")`

**Problem**: Emails not sending

**Solution**:
- Verify email service is connected (green checkmark)
- Check template variables match form field names
- Test template in EmailJS dashboard first
- Check monthly limit hasn't been reached

### General Issues

**Problem**: CORS errors

**Solution**:
- If using custom backend, enable CORS
- For Formspree/EmailJS, CORS is handled automatically

**Problem**: Form submission is slow

**Solution**:
- This is normal (3-5 seconds for email sending)
- Loading state is already implemented
- Consider adding "Sending..." message

---

## 📊 Service Comparison

| Feature | Formspree | EmailJS | Custom Backend |
|---------|-----------|---------|----------------|
| **Setup Time** | 5 minutes | 10 minutes | 1-2 hours |
| **Free Limit** | 50/month | 200/month | Unlimited* |
| **Spam Protection** | ✅ Built-in | ⚠️ Manual | ✅ Custom |
| **Dashboard** | ✅ Yes | ✅ Yes | ⚠️ Build your own |
| **Auto-responder** | ✅ Yes | ⚠️ Manual setup | ✅ Custom |
| **File Uploads** | ✅ Yes (paid) | ❌ No | ✅ Custom |
| **Reliability** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ (depends) |
| **Cost (beyond free)** | $10/month | $7/month | Varies |

*Unlimited but hosting costs apply

---

## 🎯 Recommendation

**For most users**: Use **Formspree**
- Easiest setup
- Most reliable
- Best features
- Professional dashboard

**For client-side only**: Use **EmailJS**
- No backend required
- Higher free limit
- Good for static sites

**For developers**: **Custom Backend**
- Full control
- Unlimited customization
- Can integrate with CRM, databases, etc.

---

**Your form is now ready to receive submissions! 🎉**

Test it thoroughly before going live, and monitor submissions regularly.