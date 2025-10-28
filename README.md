# Dynamic Portfolio with Supabase

A modern, responsive portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Supabase. Features a dynamic admin panel for content management and smooth animations throughout.

## 🎨 Design

- **Color Palette**: Custom color scheme with primary (#37353E), secondary (#44444E), accent (#715A5A), and light (#D3DAD9) colors
- **Animations**: Smooth transitions and interactions using Framer Motion
- **Responsive**: Mobile-first design that works on all devices
- **Modern UI**: Clean, professional interface with glassmorphism effects

## 🚀 Features

### Public Features
- **Hero Section**: Eye-catching introduction with profile image and call-to-action buttons
- **About Section**: Detailed bio with social links and personal information
- **Projects Carousel**: Interactive project showcase with smooth carousel navigation
- **Skills Grid**: Categorized skills with proficiency levels and filtering
- **Experience Timeline**: Professional experience with visual timeline
- **Contact Form**: Functional contact form with email integration
- **Footer**: Social links and additional information

### Admin Features
- **Authentication**: Secure login with Supabase Auth
- **Dashboard**: Overview of all content with statistics
- **Content Management**: CRUD operations for all portfolio content
- **Real-time Updates**: Changes reflect immediately on the public site
- **Contact Management**: View and manage contact form submissions

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS with custom configuration
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   - Create a new Supabase project
   - Run the SQL commands from `supabase-setup.sql` in your Supabase SQL editor
   - This will create all necessary tables and policies

5. **Create admin user**
   - Go to Authentication > Users in your Supabase dashboard
   - Create a new user with email and password
   - Default credentials: User: Raijin, Pass: portfolio (as requested)

6. **Start the development server**
   ```bash
   npm run dev
   ```

## 🗄 Database Schema

The portfolio uses the following Supabase tables:

- **profile**: Single row with personal information
- **projects**: Project showcase with images, descriptions, and tech stacks
- **skills**: Skills with categories and proficiency levels
- **experiences**: Professional experience timeline
- **contact_submissions**: Contact form submissions

## 🎯 Usage

### Public Site
- Visit `http://localhost:3000` to see your portfolio
- All content is dynamically loaded from Supabase
- Responsive design works on all devices

### Admin Panel
- Visit `http://localhost:3000/admin/login` to access the admin panel
- Use your Supabase credentials to log in
- Manage all portfolio content from the dashboard

### Adding Content

1. **Profile Information**
   - Edit your name, title, bio, and social links
   - Upload a profile image
   - Add resume and contact information

2. **Projects**
   - Add project title, description, and images
   - Specify tech stack and links
   - Set featured status and order

3. **Skills**
   - Add skills with categories
   - Set proficiency levels (1-5)
   - Organize by categories

4. **Experience**
   - Add professional experience
   - Include company, position, and dates
   - Add detailed descriptions

## 🎨 Customization

### Colors
Update the color palette in `tailwind.config.ts`:
```typescript
colors: {
  primary: '#37353E',
  secondary: '#44444E',
  accent: '#715A5A',
  light: '#D3DAD9',
}
```

### Animations
Modify animations in individual components or update the global CSS in `src/app/globals.css`.

### Content
All content is managed through the Supabase database, making it easy to update without code changes.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly interactions
- Optimized images and performance
- Smooth scrolling and animations

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Admin authentication required for content management
- Input validation and sanitization
- Secure API routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:
1. Check the Supabase dashboard for database errors
2. Verify environment variables are set correctly
3. Ensure all dependencies are installed
4. Check the browser console for errors

## 🎉 Features Roadmap

- [ ] Image upload and optimization
- [ ] Blog section
- [ ] Analytics integration
- [ ] SEO optimization
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Advanced animations
- [ ] Performance monitoring

---

Built with ❤️ using Next.js, Supabase, and modern web technologies.