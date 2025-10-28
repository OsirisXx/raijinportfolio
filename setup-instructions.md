# Portfolio Setup Instructions

## 🚀 Quick Start Guide

### 1. Environment Setup
Create a `.env.local` file in your project root with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tqjkoiylfwbxgbivxifn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxamtvaXlsZndieGdiaXZ4aWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyOTAxNjYsImV4cCI6MjA3Njg2NjE2Nn0.ONRAulxh7D9Wgr_N2LmeklowVk1ww3Hh0nFUQmQx01Y
```

### 2. Database Setup
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-setup.sql` into the editor
4. Run the SQL script to create all tables and sample data

### 3. Create Admin User
1. Go to Authentication > Users in your Supabase dashboard
2. Click "Add user"
3. Use these credentials:
   - **Email**: raijin@example.com (or your preferred email)
   - **Password**: portfolio
4. The user will be able to access the admin panel at `/admin/login`

### 4. Start Development Server
```bash
npm run dev
```

### 5. Access Your Portfolio
- **Public Site**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login

## 🎨 Customization

### Update Your Information
1. Log into the admin panel
2. Go to the "Profile" tab
3. Update your name, title, bio, and social links
4. Add your profile image URL
5. Update contact information

### Add Your Projects
1. Go to the "Projects" tab in admin
2. Click "Add Project"
3. Fill in project details:
   - Title and description
   - Tech stack (comma-separated)
   - Live URL and GitHub URL
   - Upload project image
   - Mark as featured if desired

### Add Your Skills
1. Go to the "Skills" tab in admin
2. Click "Add Skill"
3. Specify:
   - Skill name
   - Category (e.g., "Frontend", "Backend", "Tools")
   - Proficiency level (1-5)
   - Optional icon URL

### Add Your Experience
1. Go to the "Experience" tab in admin
2. Click "Add Experience"
3. Include:
   - Company name
   - Position title
   - Start and end dates
   - Detailed description

## 🎯 Key Features

### Public Portfolio
- **Hero Section**: Eye-catching introduction with your photo
- **About Section**: Personal story and social links
- **Projects Carousel**: Interactive showcase of your work
- **Skills Grid**: Categorized skills with proficiency levels
- **Experience Timeline**: Professional journey
- **Contact Form**: Visitors can reach out to you
- **Responsive Design**: Works perfectly on all devices

### Admin Dashboard
- **Overview**: Statistics and quick insights
- **Profile Management**: Update your personal information
- **Project Management**: Add, edit, and delete projects
- **Skills Management**: Organize your technical skills
- **Experience Management**: Manage your work history
- **Message Center**: View contact form submissions

## 🎨 Design Customization

### Color Scheme
The portfolio uses a custom color palette:
- **Primary**: #37353E (Dark purple-gray)
- **Secondary**: #44444E (Medium purple-gray)
- **Accent**: #715A5A (Dusty rose)
- **Light**: #D3DAD9 (Off-white)

### Animations
- Smooth scroll behavior
- Fade-in animations on scroll
- Hover effects on interactive elements
- Carousel transitions
- Loading animations

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy automatically

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `out` folder to your hosting provider
3. Ensure environment variables are set

## 🔧 Troubleshooting

### Common Issues
1. **Database connection errors**: Check your Supabase URL and key
2. **Authentication issues**: Verify admin user exists in Supabase
3. **Styling issues**: Ensure Tailwind CSS is properly configured
4. **Build errors**: Check for TypeScript errors and missing dependencies

### Getting Help
- Check the browser console for errors
- Verify Supabase dashboard for database issues
- Ensure all environment variables are set correctly

## 📱 Mobile Optimization

The portfolio is fully responsive and optimized for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🎉 Next Steps

1. **Customize Content**: Update all placeholder content with your information
2. **Add Projects**: Showcase your best work with detailed descriptions
3. **Optimize Images**: Use high-quality images for projects and profile
4. **SEO**: Update meta tags and descriptions for better search visibility
5. **Analytics**: Add Google Analytics or similar for visitor tracking

---

Your dynamic portfolio is now ready! 🎉





