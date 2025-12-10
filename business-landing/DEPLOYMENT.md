# 🚀 Deployment Guide - Digital Growth Studio

Complete step-by-step instructions for deploying your landing page to various hosting platforms.

---

## Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Option 1: Netlify (Recommended)](#option-1-netlify-recommended)
- [Option 2: Vercel](#option-2-vercel)
- [Option 3: GitHub Pages](#option-3-github-pages)
- [Option 4: Traditional Web Hosting](#option-4-traditional-web-hosting)
- [Option 5: AWS S3 + CloudFront](#option-5-aws-s3--cloudfront)
- [Post-Deployment Steps](#post-deployment-steps)
- [Custom Domain Setup](#custom-domain-setup)
- [SSL Certificate Setup](#ssl-certificate-setup)
- [Troubleshooting](#troubleshooting)

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure you've completed these steps:

### 1. Form Integration

- [ ] Set up Formspree or EmailJS account
- [ ] Update form endpoint in `js/main.js`
- [ ] Test form submission locally

### 2. Content Updates

- [ ] Replace "Digital Growth Studio" with your company name (if needed)
- [ ] Update contact information (email, phone, address)
- [ ] Replace placeholder text with real content
- [ ] Add real images (replace SVG placeholders)
- [ ] Update social media links

### 3. SEO Optimization

- [ ] Update meta tags in `index.html` (title, description)
- [ ] Update Open Graph tags (og:title, og:description, og:image)
- [ ] Create and add og-image.jpg (1200x630px)
- [ ] Update structured data (JSON-LD) with real company info
- [ ] Create favicon.ico and add to root

### 4. Testing

- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on mobile devices (iOS and Android)
- [ ] Test all links work
- [ ] Test form validation
- [ ] Test portfolio filtering
- [ ] Run Lighthouse audit (aim for 90+ on all metrics)
- [ ] Check console for errors

### 5. Performance

- [ ] Compress images (use TinyPNG or similar)
- [ ] Minify CSS and JavaScript (optional for small sites)
- [ ] Test page load speed
- [ ] Ensure lazy loading is working

### 6. Legal & Analytics

- [ ] Add Google Analytics tracking code (optional)
- [ ] Create Privacy Policy and Terms of Service pages
- [ ] Add cookie consent banner (if required)

---

## 🟢 Option 1: Netlify (Recommended)

**Best for**: Beginners, free hosting, automatic deployments, SSL included

### Step-by-Step Deployment

#### Method A: Deploy via Git (Recommended)

1. **Create GitHub Repository**

```bash
# Navigate to your project folder
cd digital-growth-studio

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Digital Growth Studio landing page"

# Create new repository on GitHub
# Then add remote and push
git remote add origin https://github.com/YOUR-USERNAME/digital-growth-studio.git
git branch -M main
git push -u origin main
```

2. **Sign Up / Log In to Netlify**

- Go to [https://netlify.com](https://netlify.com)
- Click "Sign up" or "Log in"
- Choose "Sign up with GitHub" (easiest)

3. **Import Project**

- Click "Add new site" → "Import an existing project"
- Choose "Deploy with GitHub"
- Authorize Netlify to access your repositories
- Select your `digital-growth-studio` repository

4. **Configure Build Settings**

```
Build command: (leave empty - it's a static site)
Publish directory: / (root directory)
```

5. **Deploy**

- Click "Deploy site"
- Wait 1-2 minutes for deployment
- Your site is live at: `https://random-name-12345.netlify.app`

6. **Change Site Name (Optional)**

- Go to Site settings → General → Site details
- Click "Change site name"
- Enter: `your-company-name`
- Your site is now: `https://your-company-name.netlify.app`

#### Method B: Drag & Drop (Quick Deploy)

1. **Prepare Files**

- Make sure all files are in one folder
- Include: index.html, css/, js/, images/

2. **Deploy via Netlify Drop**

- Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
- Drag your entire project folder onto the page
- Wait for upload (usually 30 seconds)
- Your site is live immediately!

### Continuous Deployment (Auto-Updates)

Once connected to GitHub, every push to `main` branch auto-deploys:

```bash
# Make changes to your code
git add .
git commit -m "Update hero section"
git push origin main

# Netlify automatically rebuilds and deploys (1-2 minutes)
```

### Netlify Features

✅ **Free SSL certificate** (HTTPS automatic)
✅ **CDN** (fast loading worldwide)
✅ **Automatic deployments** from Git
✅ **Deploy previews** for pull requests
✅ **Custom domains** (free)
✅ **Form handling** (100 submissions/month free)
✅ **Analytics** (upgrade required)

---

## 🔵 Option 2: Vercel

**Best for**: Modern web projects, great performance, similar to Netlify

### Deployment Steps

1. **Sign Up**

- Go to [https://vercel.com](https://vercel.com)
- Click "Sign Up"
- Choose "Continue with GitHub"

2. **Import Project**

- Click "Add New..." → "Project"
- Import your GitHub repository
- Select `digital-growth-studio`

3. **Configure**

```
Framework Preset: Other
Build Command: (leave empty)
Output Directory: (leave empty)
Install Command: (leave empty)
```

4. **Deploy**

- Click "Deploy"
- Wait 1-2 minutes
- Your site is live at: `https://your-project-name.vercel.app`

### Vercel Features

✅ **Free SSL certificate**
✅ **Edge network** (ultra-fast globally)
✅ **GitHub integration** (auto-deploy)
✅ **Preview deployments**
✅ **Analytics** (free basic tier)
✅ **Custom domains**

---

## 🟣 Option 3: GitHub Pages

**Best for**: Free hosting, simple setup, GitHub integration

### Deployment Steps

1. **Push Code to GitHub** (if not already)

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/digital-growth-studio.git
git push -u origin main
```

2. **Enable GitHub Pages**

- Go to your repository on GitHub
- Click "Settings" tab
- Scroll to "Pages" section (left sidebar)
- Under "Source", select:
  - Branch: `main`
  - Folder: `/ (root)`
- Click "Save"

3. **Wait for Deployment**

- GitHub will build your site (1-2 minutes)
- Your site will be available at:
  - `https://YOUR-USERNAME.github.io/digital-growth-studio/`

### Important Notes

**Base URL Issue**: If your repository name is not `YOUR-USERNAME.github.io`, you'll need to update links:

```html
<!-- Update all links from -->
<link rel="stylesheet" href="css/style.css">

<!-- To -->
<link rel="stylesheet" href="/digital-growth-studio/css/style.css">
```

**Better Solution**: Rename repository to `YOUR-USERNAME.github.io` for root URL.

### Custom Domain with GitHub Pages

1. **Add Custom Domain**

- Go to Settings → Pages
- Under "Custom domain", enter: `www.yoursite.com`
- Click "Save"

2. **Configure DNS**

Add these records at your domain registrar:

```
Type: CNAME
Name: www
Value: YOUR-USERNAME.github.io.
```

3. **Enable HTTPS**

- Check "Enforce HTTPS" (after DNS propagates)

---

## 🌐 Option 4: Traditional Web Hosting

**Best for**: Existing hosting account (Bluehost, SiteGround, HostGator, etc.)

### Deployment via FTP

1. **Get FTP Credentials**

From your web host control panel (cPanel), note:
- FTP Host: `ftp.yoursite.com`
- Username: Your hosting username
- Password: Your hosting password
- Port: Usually 21

2. **Install FTP Client**

- Download FileZilla: [https://filezilla-project.org](https://filezilla-project.org)
- Or use any FTP client (Cyberduck, WinSCP, etc.)

3. **Connect to Server**

- Open FileZilla
- Enter Host, Username, Password, Port
- Click "Quickconnect"

4. **Upload Files**

- Navigate to `public_html` folder (or `www`, `htdocs`)
- Drag all files from your local project folder:
  - index.html
  - css/ folder
  - js/ folder
  - images/ folder

5. **Set Permissions**

- Right-click folders → File permissions → 755
- Right-click files → File permissions → 644

6. **Test**

- Visit `https://yoursite.com`
- Test all functionality

### Deployment via cPanel File Manager

1. **Log into cPanel**

- Go to `yoursite.com/cpanel`
- Enter username and password

2. **Open File Manager**

- Find "File Manager" icon
- Click to open

3. **Navigate to public_html**

- Double-click `public_html` folder

4. **Upload Files**

- Click "Upload" button
- Drag and drop files or click "Select File"
- Upload all files (index.html, css/, js/, images/)

5. **Extract (if uploaded as ZIP)**

- Right-click ZIP file
- Click "Extract"
- Delete ZIP file after extraction

---

## ☁️ Option 5: AWS S3 + CloudFront

**Best for**: Scalability, custom configurations, AWS ecosystem

### Deployment Steps

1. **Create S3 Bucket**

- Log into AWS Console
- Go to S3 service
- Click "Create bucket"
- Name: `yoursite.com`
- Region: Choose nearest to your audience
- Uncheck "Block all public access"
- Click "Create bucket"

2. **Upload Files**

- Click on your bucket
- Click "Upload"
- Add all files (index.html, css/, js/, images/)
- Click "Upload"

3. **Enable Static Website Hosting**

- Go to bucket Properties
- Scroll to "Static website hosting"
- Click "Edit"
- Enable "Static website hosting"
- Index document: `index.html`
- Error document: `index.html`
- Click "Save"

4. **Set Bucket Policy** (Make Public)

- Go to Permissions tab
- Scroll to "Bucket policy"
- Add this policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::yoursite.com/*"
        }
    ]
}
```

5. **Access Your Site**

- Note the website endpoint (in Properties)
- Format: `http://yoursite.com.s3-website-region.amazonaws.com`

6. **Set Up CloudFront (CDN) - Optional**

- Go to CloudFront service
- Click "Create distribution"
- Origin domain: Select your S3 bucket
- Click "Create distribution"
- Wait 15-20 minutes for deployment
- Access via CloudFront URL

### Enable HTTPS with CloudFront

- Request SSL certificate via AWS Certificate Manager
- Attach to CloudFront distribution
- Configure custom domain

---

## 🔧 Post-Deployment Steps

### 1. Test Everything

- [ ] All pages load correctly
- [ ] Navigation links work
- [ ] Forms submit successfully
- [ ] Images display properly
- [ ] Mobile view works correctly
- [ ] No console errors
- [ ] SSL certificate is active (HTTPS)

### 2. SEO Submission

```bash
# Submit sitemap to Google
https://search.google.com/search-console

# Add sitemap URL:
https://yoursite.com/sitemap.xml

# Submit to Bing
https://www.bing.com/webmasters
```

### 3. Performance Check

- Run Lighthouse audit
- Check page load speed at: [https://pagespeed.web.dev](https://pagespeed.web.dev)
- Aim for:
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 95+
  - SEO: 95+

### 4. Set Up Analytics

Add Google Analytics:

```html
<!-- Add before </head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 5. Set Up Monitoring

- **Uptime monitoring**: [UptimeRobot](https://uptimerobot.com) (free)
- **Error tracking**: [Sentry](https://sentry.io) (optional)

---

## 🌍 Custom Domain Setup

### Netlify Custom Domain

1. **Buy Domain** (Namecheap, Google Domains, etc.)

2. **Add Domain in Netlify**

- Go to Site settings → Domain management
- Click "Add custom domain"
- Enter: `yoursite.com`
- Click "Verify"

3. **Configure DNS**

**Option A: Use Netlify DNS (Easiest)**

- Netlify will provide nameservers
- Update at your domain registrar:
  - ns1.netlify.com
  - ns2.netlify.com

**Option B: Use External DNS**

Add records at your domain registrar:

```
Type: A
Name: @
Value: 75.2.60.5 (Netlify Load Balancer IP)

Type: CNAME
Name: www
Value: your-site.netlify.app
```

4. **Wait for DNS Propagation** (up to 48 hours)

5. **Enable HTTPS** (automatic after DNS propagates)

---

## 🔒 SSL Certificate Setup

### Netlify / Vercel

✅ **Automatic** - SSL is provisioned automatically (Let's Encrypt)

### GitHub Pages

✅ **Automatic** - Check "Enforce HTTPS" in settings

### Traditional Hosting

**Option 1: Let's Encrypt (Free)**

- Log into cPanel
- Find "SSL/TLS Status"
- Click "Run AutoSSL"

**Option 2: Paid SSL**

- Purchase SSL certificate
- Upload via cPanel → SSL/TLS → Install Certificate

### AWS S3 + CloudFront

- Request certificate in AWS Certificate Manager
- Attach to CloudFront distribution

---

## 🐛 Troubleshooting

### Site Not Loading

**Check**:
- [ ] Did you upload all files (index.html, css/, js/)?
- [ ] Is index.html in the root directory?
- [ ] Are file paths correct (case-sensitive)?
- [ ] Check browser console for errors

### Forms Not Working

**Check**:
- [ ] Did you update Formspree endpoint in js/main.js?
- [ ] Is JavaScript file loading? (check console)
- [ ] CORS settings if using custom backend

### Images Not Displaying

**Check**:
- [ ] Image paths are correct
- [ ] Images were uploaded to server
- [ ] File extensions match (case-sensitive on Linux servers)

### Mobile View Broken

**Check**:
- [ ] Viewport meta tag exists in HTML
- [ ] CSS media queries are correct
- [ ] Test in Chrome DevTools device mode

### Custom Domain Not Working

**Check**:
- [ ] DNS records are correct
- [ ] Wait 24-48 hours for DNS propagation
- [ ] Clear browser cache
- [ ] Check domain registration is active

### HTTPS Not Working

**Check**:
- [ ] SSL certificate is installed
- [ ] DNS has propagated
- [ ] Mixed content warnings (load all assets via HTTPS)

---

## 📊 Deployment Comparison

| Platform | Cost | Ease | Speed | Features | Best For |
|----------|------|------|-------|----------|----------|
| Netlify | Free | ⭐⭐⭐⭐⭐ | Fast | ⭐⭐⭐⭐⭐ | Most users |
| Vercel | Free | ⭐⭐⭐⭐⭐ | Fast | ⭐⭐⭐⭐⭐ | Developers |
| GitHub Pages | Free | ⭐⭐⭐⭐ | Medium | ⭐⭐⭐ | Developers |
| Traditional Host | $3-10/mo | ⭐⭐⭐ | Varies | ⭐⭐⭐ | Existing accounts |
| AWS S3 | Pay-as-go | ⭐⭐ | Very Fast | ⭐⭐⭐⭐ | Enterprise |

---

## ✅ Deployment Checklist

Print this checklist:

- [ ] Pre-deployment testing complete
- [ ] Form integration configured
- [ ] Content updated
- [ ] SEO meta tags updated
- [ ] Images optimized
- [ ] Code committed to Git
- [ ] Deployed to hosting platform
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Site loads correctly
- [ ] All links work
- [ ] Forms submit successfully
- [ ] Mobile view tested
- [ ] Lighthouse audit passed (90+ all metrics)
- [ ] Google Analytics installed
- [ ] Sitemap submitted to search engines
- [ ] Uptime monitoring configured

---

**Congratulations! Your site is now live! 🎉**

Share your deployed URL:
- `https://yoursite.com` (custom domain)
- `https://yoursite.netlify.app` (Netlify)
- `https://yoursite.vercel.app` (Vercel)
- `https://username.github.io/project` (GitHub Pages)