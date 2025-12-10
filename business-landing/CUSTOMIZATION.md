# 🎨 Customization Guide - Digital Growth Studio

Complete guide for customizing the landing page for different businesses and industries.

---

## Table of Contents

- [Quick Customizations](#quick-customizations)
- [Color Scheme](#color-scheme)
- [Typography](#typography)
- [Content Updates](#content-updates)
- [Adding/Removing Sections](#addingremoving-sections)
- [Industry Variations](#industry-variations)
- [Advanced Customizations](#advanced-customizations)

---

## 🚀 Quick Customizations (15 minutes)

### 1. Company Name & Branding

**Find & Replace** "Digital Growth Studio" throughout the project:

- `index.html` - All instances (about 15 occurrences)
- `README.md` - Documentation
- `js/main.js` - Console messages

**VS Code Tip**: Press `Ctrl+Shift+F` (or `Cmd+Shift+F` on Mac) to search across all files.

### 2. Contact Information

Edit `index.html`, Contact Section (around line 1200):

```html
<!-- Email -->
<a href="mailto:YOUR-EMAIL@example.com">your-email@example.com</a>

<!-- Phone -->
<a href="tel:+1234567890">+1 (234) 567-8900</a>

<!-- Address -->
<p>Your City, Your Country</p>

<!-- Office Hours -->
<p>Monday - Friday<br>9:00 AM - 6:00 PM YOUR_TIMEZONE</p>
```

### 3. Social Media Links

Update all social media links in:

**Header (not visible but in code)**:
```html
<!-- Around line 50 -->
<meta property="og:url" content="https://yourwebsite.com/">
```

**Footer** (around line 1400):
```html
<a href="https://linkedin.com/company/YOUR-COMPANY" target="_blank">
<a href="https://twitter.com/YOUR-HANDLE" target="_blank">
<a href="https://instagram.com/YOUR-HANDLE" target="_blank">
<a href="https://facebook.com/YOUR-PAGE" target="_blank">
<a href="https://github.com/YOUR-USERNAME" target="_blank">
```

**Contact Section** (around line 1250):
```html
<!-- Same social links appear here -->
```

### 4. Logo

**Option A: Text Logo** (Current)
- Already implemented with rocket icon
- Change icon: Replace `fa-rocket` with any [Font Awesome icon](https://fontawesome.com/icons)
- Example: `fa-globe`, `fa-chart-line`, `fa-laptop-code`

**Option B: Image Logo**

Replace in `index.html` (around line 50):
```html
<!-- Replace this -->
<div class="nav__logo">
    <i class="fas fa-rocket"></i>
    <span>Digital Growth Studio</span>
</div>

<!-- With this -->
<div class="nav__logo">
    <img src="images/logo.png" alt="Your Company" height="40">
</div>
```

Update CSS in `css/style.css`:
```css
.nav__logo img {
    height: 40px;
    width: auto;
}
```

---

## 🎨 Color Scheme

### Method 1: Update CSS Variables (Recommended)

Edit `css/style.css` (lines 7-30):

```css
:root {
    /* Primary Brand Color */
    --primary-color: #3B82F6;      /* Blue - Change this! */
    --primary-dark: #2563EB;       /* Darker shade */
    
    /* Secondary/Accent Color */
    --secondary-color: #10B981;    /* Green - Change this! */
    --secondary-dark: #059669;     /* Darker shade */
    
    /* Additional Accents */
    --accent-color: #8B5CF6;       /* Purple */
    --accent-orange: #F59E0B;      /* Orange */
    --accent-red: #EF4444;         /* Red */
    
    /* Backgrounds */
    --bg-primary: #FFFFFF;         /* White */
    --bg-secondary: #F9FAFB;       /* Light gray */
    --bg-tertiary: #F3F4F6;        /* Lighter gray */
    
    /* Text Colors */
    --text-primary: #1F2937;       /* Dark gray */
    --text-secondary: #6B7280;     /* Medium gray */
    --text-light: #9CA3AF;         /* Light gray */
}
```

### Pre-Made Color Schemes

#### Professional Blue (Default)
```css
--primary-color: #3B82F6;
--secondary-color: #10B981;
--accent-color: #8B5CF6;
```

#### Tech Startup (Purple)
```css
--primary-color: #8B5CF6;
--secondary-color: #EC4899;
--accent-color: #F59E0B;
```

#### Corporate (Navy Blue)
```css
--primary-color: #1E40AF;
--secondary-color: #059669;
--accent-color: #DC2626;
```

#### Creative Agency (Bright)
```css
--primary-color: #EC4899;
--secondary-color: #8B5CF6;
--accent-color: #F59E0B;
```

#### Finance/Legal (Conservative)
```css
--primary-color: #1F2937;
--secondary-color: #3B82F6;
--accent-color: #10B981;
```

#### E-commerce (Vibrant)
```css
--primary-color: #EF4444;
--secondary-color: #F59E0B;
--accent-color: #8B5CF6;
```

### Method 2: Generate Custom Palette

Use these tools to generate cohesive color schemes:

1. **Coolors** - [https://coolors.co](https://coolors.co)
   - Generate random palettes
   - Export hex codes

2. **Adobe Color** - [https://color.adobe.com](https://color.adobe.com)
   - Color wheel tool
   - Harmony rules (complementary, triadic, etc.)

3. **Paletton** - [https://paletton.com](https://paletton.com)
   - Advanced color scheme designer
   - Accessibility checker

### Gradient Updates

Update gradient backgrounds in `css/style.css`:

```css
/* Primary Gradient (used in buttons, badges) */
--gradient-primary: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);

/* Example: Orange to Pink */
--gradient-primary: linear-gradient(135deg, #F59E0B 0%, #EC4899 100%);

/* Example: Blue to Teal */
--gradient-primary: linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%);
```

---

## ✍️ Typography

### Change Fonts

#### Option 1: Google Fonts (Easy)

1. **Choose fonts** at [Google Fonts](https://fonts.google.com)

2. **Update HTML** in `index.html` (line ~25):
```html
<!-- Replace -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

<!-- With your fonts -->
<link href="https://fonts.googleapis.com/css2?family=YOUR_BODY_FONT:wght@300;400;500;600;700&family=YOUR_HEADING_FONT:wght@500;600;700;800&display=swap" rel="stylesheet">
```

3. **Update CSS** in `css/style.css`:
```css
:root {
    --font-primary: 'YOUR_BODY_FONT', sans-serif;
    --font-heading: 'YOUR_HEADING_FONT', sans-serif;
}
```

#### Recommended Font Combinations

**Modern & Clean**:
```css
--font-primary: 'Inter', sans-serif;
--font-heading: 'Poppins', sans-serif;
```

**Professional Business**:
```css
--font-primary: 'Open Sans', sans-serif;
--font-heading: 'Montserrat', sans-serif;
```

**Tech/Startup**:
```css
--font-primary: 'Roboto', sans-serif;
--font-heading: 'Space Grotesk', sans-serif;
```

**Creative/Design**:
```css
--font-primary: 'Work Sans', sans-serif;
--font-heading: 'Playfair Display', serif;
```

**Corporate/Finance**:
```css
--font-primary: 'Lato', sans-serif;
--font-heading: 'Merriweather', serif;
```

### Adjust Font Sizes

Edit `css/style.css`:

```css
:root {
    --h1-font-size: 3.5rem;     /* Hero title */
    --h2-font-size: 2.5rem;     /* Section titles */
    --h3-font-size: 1.75rem;    /* Card titles */
    --h4-font-size: 1.25rem;    /* Small headings */
    --normal-font-size: 1rem;   /* Body text */
    --small-font-size: 0.875rem; /* Small text */
}
```

**Make everything bigger**:
```css
--h1-font-size: 4rem;
--h2-font-size: 3rem;
--h3-font-size: 2rem;
--normal-font-size: 1.125rem;
```

**Make everything smaller**:
```css
--h1-font-size: 3rem;
--h2-font-size: 2rem;
--h3-font-size: 1.5rem;
--normal-font-size: 0.9375rem;
```

---

## 📝 Content Updates

### Hero Section

Edit `index.html` (around line 70):

```html
<!-- Main Headline -->
<h1 class="hero__title">
    Your Compelling Headline with 
    <span class="gradient-text">Key Benefit</span> 
    Goes Here
</h1>

<!-- Subheadline -->
<p class="hero__description">
    Your value proposition. Explain what you do, who you help, and why you're different. Keep it under 2 sentences for maximum impact.
</p>

<!-- Call-to-Action Buttons -->
<a href="#contact" class="btn btn-primary">
    <i class="fas fa-ICON-NAME"></i>
    Your Primary CTA
</a>
<a href="#portfolio" class="btn btn-secondary">
    <i class="fas fa-ICON-NAME"></i>
    Your Secondary CTA
</a>
```

**Headline Formulas**:
- "Transform [Problem] into [Benefit] with [Solution]"
- "The [Adjective] Way to [Achieve Goal]"
- "Help [Target Audience] [Achieve Result] in [Timeframe]"
- "[Number]+ [Customers] Trust Us to [Value Proposition]"

### Achievement Badges

Update badges in hero (line ~55):

```html
<div class="badge" data-badge="1">
    <i class="fas fa-YOUR-ICON"></i>
    <div class="badge__text">
        <span class="badge__number">YOUR#</span>
        <span class="badge__label">Your Metric</span>
    </div>
</div>
```

**Metric Ideas**:
- Client count: "500+ Happy Clients"
- Success rate: "98% Success Rate"
- Experience: "10+ Years Experience"
- Team size: "50+ Team Members"
- Projects: "1000+ Projects"
- Countries: "15+ Countries"

### Services Section

Edit service cards (line ~150):

```html
<div class="service__card">
    <div class="service__icon">
        <i class="fas fa-YOUR-ICON"></i>
    </div>
    <h3 class="service__title">Your Service Name</h3>
    <p class="service__description">
        Brief description of the service. Focus on benefits, not features. 2-3 sentences maximum.
    </p>
    <a href="#contact" class="service__link">
        Learn More <i class="fas fa-arrow-right"></i>
    </a>
</div>
```

**Icon Suggestions** (Font Awesome):
- Web Development: `fa-laptop-code`, `fa-code`, `fa-desktop`
- SEO: `fa-search`, `fa-chart-line`, `fa-ranking-star`
- Marketing: `fa-bullhorn`, `fa-hashtag`, `fa-chart-pie`
- Design: `fa-palette`, `fa-pencil-ruler`, `fa-bezier-curve`
- Consulting: `fa-user-tie`, `fa-handshake`, `fa-clipboard-check`
- Support: `fa-headset`, `fa-life-ring`, `fa-comments`

### Testimonials

Add/edit testimonials (line ~800):

```html
<div class="swiper-slide">
    <div class="testimonial__card">
        <div class="testimonial__quote">
            <i class="fas fa-quote-left"></i>
        </div>
        <div class="testimonial__stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
        </div>
        <p class="testimonial__text">
            "Your client's testimonial here. Focus on specific results and emotional impact. 2-3 sentences work best."
        </p>
        <div class="testimonial__author">
            <div class="testimonial__avatar">
                <!-- Add client photo SVG or image -->
            </div>
            <div class="testimonial__info">
                <h4 class="testimonial__name">Client Name</h4>
                <p class="testimonial__position">Position, Company Name</p>
            </div>
        </div>
    </div>
</div>
```

### Pricing Tiers

Update pricing (line ~1000):

```html
<div class="pricing__card">
    <div class="pricing__header">
        <h3 class="pricing__name">Your Plan Name</h3>
        <p class="pricing__description">Target audience description</p>
    </div>
    <div class="pricing__price">
        <span class="pricing__currency">$</span>
        <span class="pricing__amount">999</span>
        <span class="pricing__period">/month</span>
    </div>
    <ul class="pricing__features">
        <li><i class="fas fa-check"></i> Feature 1</li>
        <li><i class="fas fa-check"></i> Feature 2</li>
        <li><i class="fas fa-check"></i> Feature 3</li>
        <li class="disabled"><i class="fas fa-times"></i> Not included</li>
    </ul>
    <a href="#contact" class="btn btn-outline">Get Started</a>
</div>
```

### FAQ Questions

Update FAQ items (line ~1100):

```html
<div class="faq__item">
    <div class="faq__question">
        <h3>Your question here?</h3>
        <i class="fas fa-plus faq__icon"></i>
    </div>
    <div class="faq__answer">
        <p>Your detailed answer here. Be helpful and thorough.</p>
    </div>
</div>
```

**Common FAQ Topics**:
- Pricing and payment
- Project timeline
- Process and workflow
- Support and maintenance
- Guarantees and refunds
- Technical requirements
- Getting started
- Customization options

---

## ➕➖ Adding/Removing Sections

### Remove a Section

1. **Delete HTML** - Remove the entire `<section>` block
2. **Remove from Navigation** - Delete the nav link
3. **Test** - Ensure other sections still work

Example - Remove Pricing Section:
```html
<!-- DELETE THIS ENTIRE BLOCK -->
<section class="pricing section" id="pricing">
    <!-- ... all pricing content ... -->
</section>
```

And remove from nav:
```html
<!-- DELETE THIS -->
<li class="nav__item"><a href="#pricing" class="nav__link">Pricing</a></li>
```

### Add a New Section

1. **Copy an existing section** as a template
2. **Change the ID** - `id="new-section"`
3. **Update content**
4. **Add to navigation**:

```html
<li class="nav__item"><a href="#new-section" class="nav__link">New Section</a></li>
```

5. **Add CSS** (if needed) in `css/style.css`

### Reorder Sections

Simply cut and paste entire `<section>` blocks in desired order. Navigation will automatically update active states.

---

## 🏢 Industry Variations

### E-Commerce Store

**Changes**:
- Hero CTA: "Shop Now" instead of "Get Free Consultation"
- Add Product Showcase section instead of Services
- Portfolio → Customer Reviews with product photos
- Add "Money-Back Guarantee" badges

**Color Scheme**: Vibrant (Red + Orange)

**Sections**: Hero, Products, Features, Reviews, Shipping Info, FAQ, Contact

### SaaS Company

**Changes**:
- Hero: Add "Start Free Trial" CTA
- Services → Features
- Add "Integrations" section
- Pricing: Monthly/Annual toggle
- Add "Live Demo" modal

**Color Scheme**: Tech (Purple + Blue)

**Sections**: Hero, Features, Integrations, Pricing, Testimonials, FAQ, Demo

### Consulting Firm

**Changes**:
- Hero: "Schedule Consultation" CTA
- Add "Methodology" section
- Portfolio → Case Studies with ROI data
- Add "Team" section with consultant profiles

**Color Scheme**: Professional (Navy + Green)

**Sections**: Hero, Services, Methodology, Team, Case Studies, Testimonials, Contact

### Restaurant

**Changes**:
- Hero: "View Menu" + "Order Now" CTAs
- Services → Menu Categories
- Add "Location & Hours" section
- Portfolio → Food Gallery
- Add "Reservations" form

**Color Scheme**: Warm (Red + Orange + Yellow)

**Sections**: Hero, Menu, Gallery, Reviews, Location, Reservations

### Real Estate Agency

**Changes**:
- Hero: "Browse Properties" CTA
- Services → Property Types
- Portfolio → Featured Listings
- Add "Mortgage Calculator"
- Add "Agent Profiles"

**Color Scheme**: Trustworthy (Blue + Gold)

**Sections**: Hero, Properties, Services, Agents, Testimonials, Calculator, Contact

---

## 🔧 Advanced Customizations

### Add Dark Mode

1. **Add Toggle Button** in header:
```html
<button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
    <i class="fas fa-moon"></i>
</button>
```

2. **Add Dark Mode Variables** in CSS:
```css
[data-theme="dark"] {
    --bg-primary: #1F2937;
    --bg-secondary: #111827;
    --text-primary: #F9FAFB;
    --text-secondary: #D1D5DB;
    /* ... update all colors ... */
}
```

3. **Add Toggle JavaScript**:
```javascript
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
```

### Add Animation Library

Replace CSS animations with [Animate.css](https://animate.style/):

1. **Add to HTML**:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
```

2. **Use classes**:
```html
<div class="animate__animated animate__fadeInUp">Content</div>
```

### Add Particles Background

Use [Particles.js](https://vincentgarreau.com/particles.js/) for animated backgrounds:

1. **Add library**:
```html
<script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
```

2. **Add container** to hero:
```html
<div id="particles-js"></div>
```

3. **Initialize**:
```javascript
particlesJS.load('particles-js', 'path/to/particles.json');
```

### Add Live Chat

Integrate [Tawk.to](https://www.tawk.to/) (free):

1. **Sign up and get code**
2. **Add before `</body>`**:
```html
<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{};
// ... code from Tawk.to ...
</script>
<!--End of Tawk.to Script-->
```

---

## ✅ Customization Checklist

Print this when customizing:

- [ ] Update company name throughout
- [ ] Replace logo
- [ ] Update color scheme
- [ ] Change fonts (if desired)
- [ ] Update hero headline and description
- [ ] Update achievement badges
- [ ] Replace service cards with your services
- [ ] Update portfolio projects
- [ ] Add real testimonials
- [ ] Update pricing tiers
- [ ] Customize FAQ questions
- [ ] Update contact information
- [ ] Replace social media links
- [ ] Add real images
- [ ] Update meta tags and SEO
- [ ] Test all links
- [ ] Test on mobile
- [ ] Run Lighthouse audit

---

**Your customized landing page is ready! 🎉**

Remember to test thoroughly after making changes!