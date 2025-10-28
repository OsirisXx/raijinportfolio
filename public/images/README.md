# Portfolio Images

This directory contains all images used in your portfolio. Images are organized by category for easy management.

## 📁 Folder Structure

### `/profile/`
**Purpose**: Profile and personal images
**Recommended files**:
- `profile.jpg` or `profile.png` - Your main profile photo
- `profile-avatar.jpg` - Alternative profile image
- `background.jpg` - Hero section background (optional)

**Usage**: These images will be used in the Hero section and About section

### `/projects/`
**Purpose**: Project showcase images
**Recommended naming**:
- `project-1.jpg` - First project image
- `project-2.jpg` - Second project image
- `project-portfolio.jpg` - Portfolio website project
- `project-ecommerce.jpg` - E-commerce project
- `project-taskmanager.jpg` - Task management app

**Usage**: These images will be displayed in the Projects carousel

### `/skills/`
**Purpose**: Skill icons and category images
**Recommended files**:
- `javascript.svg` - JavaScript icon
- `react.svg` - React icon
- `nodejs.svg` - Node.js icon
- `typescript.svg` - TypeScript icon
- `frontend.svg` - Frontend category icon
- `backend.svg` - Backend category icon

**Usage**: These icons will be used in the Skills section

### `/experience/`
**Purpose**: Company logos and experience-related images
**Recommended files**:
- `company-1.jpg` - First company logo
- `company-2.jpg` - Second company logo
- `freelance.jpg` - Freelance work image
- `certificate.jpg` - Certifications (optional)

**Usage**: These images will be used in the Experience timeline

## 🖼️ Image Guidelines

### **Profile Images**
- **Size**: 400x400px minimum (square format recommended)
- **Format**: JPG or PNG
- **Quality**: High resolution, professional headshot
- **Background**: Clean, professional background

### **Project Images**
- **Size**: 600x400px (3:2 aspect ratio recommended)
- **Format**: JPG or PNG
- **Quality**: High resolution, clear project screenshots
- **Content**: Project interface, mockups, or key features

### **Skill Icons**
- **Size**: 64x64px or 128x128px
- **Format**: SVG (preferred) or PNG
- **Style**: Consistent design, preferably from the same icon set
- **Background**: Transparent or consistent with your color scheme

### **Experience Images**
- **Size**: 200x200px (square format)
- **Format**: JPG or PNG
- **Content**: Company logos, certificates, or work-related images

## 🚀 How to Use

1. **Add your images** to the appropriate folders
2. **Update the database** through the admin panel with the correct image paths
3. **Image paths** should be relative to the public folder:
   - `/images/profile/profile.jpg`
   - `/images/projects/project-1.jpg`
   - `/images/skills/javascript.svg`

## 📝 Example Image Paths

```javascript
// Profile image
profile_image_url: "/images/profile/profile.jpg"

// Project image
image_url: "/images/projects/portfolio-website.jpg"

// Skill icon
icon_url: "/images/skills/react.svg"

// Company logo
company_logo: "/images/experience/tech-company.jpg"
```

## 🎨 Color Scheme Integration

Your images should complement the portfolio color palette:
- **Primary**: #37353E (dark purple-gray)
- **Secondary**: #44444E (medium purple-gray)
- **Accent**: #715A5A (dusty rose)
- **Light**: #D3DAD9 (off-white)

Consider using these colors in your image backgrounds or overlays for consistency.

## 📱 Responsive Considerations

- Images will be automatically optimized by Next.js
- Use high-quality source images for best results
- Consider creating multiple sizes for different screen resolutions
- Test images on both desktop and mobile devices

---

**Note**: All images in the `/public` folder are publicly accessible. Make sure not to include any sensitive or private information in your images.





