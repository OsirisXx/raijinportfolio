import { supabase } from '@/lib/supabase'
import Hero from '@/components/Hero'
import About from '@/components/About'
import ProjectCarousel from '@/components/ProjectCarousel'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { Profile, Project, Skill, Experience as ExperienceType } from '@/lib/types'

async function getData() {
  try {
    // Fetch all data in parallel
    const [profileResult, projectsResult, skillsResult, experiencesResult] = await Promise.all([
      supabase.from('profile').select('*').single(),
      supabase.from('projects').select('*').order('order_index', { ascending: true }),
      supabase.from('skills').select('*').order('order_index', { ascending: true }),
      supabase.from('experiences').select('*').order('order_index', { ascending: true })
    ])

    // Default profile data
    const defaultProfile: Profile = {
      id: '1',
      name: 'Raijin Tech Solutions',
      title: 'Freelance Software Developer',
      bio: 'Passionate freelance software developer with expertise in modern web technologies. I specialize in creating innovative solutions and bringing ideas to life through code. Ready to help businesses and entrepreneurs turn their visions into reality with custom web applications, mobile apps, and digital solutions.',
      profile_image_url: '/images/profile/profile.jpg',
      email: 'raijinjyn1@gmail.com',
      facebook: 'https://www.facebook.com/raijin.offi',
      location: 'Philippines',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    return {
      profile: profileResult.data || defaultProfile,
      projects: projectsResult.data || [],
      skills: skillsResult.data || [],
      experiences: experiencesResult.data || []
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      profile: {
        id: '1',
        name: 'Raijin Tech Solutions',
        title: 'Freelance Software Developer',
        bio: 'Passionate freelance software developer with expertise in modern web technologies. I specialize in creating innovative solutions and bringing ideas to life through code. Ready to help businesses and entrepreneurs turn their visions into reality with custom web applications, mobile apps, and digital solutions.',
        profile_image_url: '/images/profile/profile.jpg',
        email: 'raijinjyn1@gmail.com',
        facebook: 'https://www.facebook.com/raijin.offi',
        location: 'Philippines',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      projects: [],
      skills: [],
      experiences: []
    }
  }
}

export default async function Home() {
  const { profile, projects, skills, experiences } = await getData()

  return (
    <main className="min-h-screen">
      <Hero profile={profile} />
      <About profile={profile} />
      <ProjectCarousel projects={projects} />
      <Skills skills={skills} />
      <Experience experiences={experiences} />
      <Contact profile={profile} />
      <Footer profile={profile} />
    </main>
  )
}
