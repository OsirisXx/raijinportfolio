'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Profile, Project, Skill, Experience, ContactSubmission } from '@/lib/types'
import { motion } from 'framer-motion'
import { 
  User, 
  FolderOpen, 
  Code, 
  Briefcase, 
  MessageSquare, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  X
} from 'lucide-react'
import Modal from '@/components/Modal'
import FileUpload from '@/components/FileUpload'

interface ProjectFormData extends Omit<Partial<Project>, 'tech_stack'> {
  tech_stack?: string | string[]
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [profile, setProfile] = useState<Profile | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  
  // Modal states
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false)
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  // Form states
  const [profileForm, setProfileForm] = useState<Partial<Profile>>({})
  const [projectForm, setProjectForm] = useState<ProjectFormData>({})
  const [skillForm, setSkillForm] = useState<Partial<Skill>>({})
  const [experienceForm, setExperienceForm] = useState<Partial<Experience>>({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [profileResult, projectsResult, skillsResult, experiencesResult, submissionsResult] = await Promise.all([
        supabase.from('profile').select('*').single(),
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('skills').select('*').order('order_index', { ascending: true }),
        supabase.from('experiences').select('*').order('order_index', { ascending: true }),
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false })
      ])

      setProfile(profileResult.data)
      setProjects(projectsResult.data || [])
      setSkills(skillsResult.data || [])
      setExperiences(experiencesResult.data || [])
      setSubmissions(submissionsResult.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const deleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await supabase.from('projects').delete().eq('id', id)
      fetchData()
    }
  }

  const deleteSkill = async (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      await supabase.from('skills').delete().eq('id', id)
      fetchData()
    }
  }

  const deleteExperience = async (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      await supabase.from('experiences').delete().eq('id', id)
      fetchData()
    }
  }

  const deleteSubmission = async (id: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      await supabase.from('contact_submissions').delete().eq('id', id)
      fetchData()
    }
  }

  // Profile functions
  const openProfileModal = () => {
    if (profile) {
      setProfileForm(profile)
    }
    setIsProfileModalOpen(true)
  }

  const saveProfile = async () => {
    setIsSubmitting(true)
    try {
      // Filter out undefined values and ensure required fields are present
      const updateData = Object.fromEntries(
        Object.entries(profileForm).filter(([_, value]) => value !== undefined && value !== '')
      )
      
      console.log('Updating profile with data:', updateData)
      
      const { error } = await supabase
        .from('profile')
        .update(updateData)
        .eq('id', profile?.id)
      
      if (!error) {
        fetchData()
        setIsProfileModalOpen(false)
        showMessage('success', 'Profile updated successfully!')
      } else {
        console.error('Supabase error details:', error)
        showMessage('error', `Failed to update profile: ${error.message}`)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      showMessage('error', 'An error occurred while updating profile')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Project functions
  const openProjectModal = (project?: Project) => {
    if (project) {
      setProjectForm(project)
      setEditingItem(project)
    } else {
      setProjectForm({})
      setEditingItem(null)
    }
    setIsProjectModalOpen(true)
  }

  const saveProject = async () => {
    setIsSubmitting(true)
    try {
      const projectData = {
        ...projectForm,
        tech_stack: projectForm.tech_stack ? (typeof projectForm.tech_stack === 'string' ? projectForm.tech_stack.split(',').map((t: string) => t.trim()) : projectForm.tech_stack) : []
      }
      
      if (editingItem) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingItem.id)
        if (!error) {
          fetchData()
          setIsProjectModalOpen(false)
        }
      } else {
        const { error } = await supabase
          .from('projects')
          .insert(projectData)
        if (!error) {
          fetchData()
          setIsProjectModalOpen(false)
        }
      }
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Skill functions
  const openSkillModal = (skill?: Skill) => {
    if (skill) {
      setSkillForm(skill)
      setEditingItem(skill)
    } else {
      setSkillForm({})
      setEditingItem(null)
    }
    setIsSkillModalOpen(true)
  }

  const saveSkill = async () => {
    setIsSubmitting(true)
    try {
      if (editingItem) {
        const { error } = await supabase
          .from('skills')
          .update(skillForm)
          .eq('id', editingItem.id)
        if (!error) {
          fetchData()
          setIsSkillModalOpen(false)
        }
      } else {
        const { error } = await supabase
          .from('skills')
          .insert(skillForm)
        if (!error) {
          fetchData()
          setIsSkillModalOpen(false)
        }
      }
    } catch (error) {
      console.error('Error saving skill:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Experience functions
  const openExperienceModal = (experience?: Experience) => {
    if (experience) {
      setExperienceForm(experience)
      setEditingItem(experience)
    } else {
      setExperienceForm({})
      setEditingItem(null)
    }
    setIsExperienceModalOpen(true)
  }

  const saveExperience = async () => {
    setIsSubmitting(true)
    try {
      if (editingItem) {
        const { error } = await supabase
          .from('experiences')
          .update(experienceForm)
          .eq('id', editingItem.id)
        if (!error) {
          fetchData()
          setIsExperienceModalOpen(false)
        }
      } else {
        const { error } = await supabase
          .from('experiences')
          .insert(experienceForm)
        if (!error) {
          fetchData()
          setIsExperienceModalOpen(false)
        }
      }
    } catch (error) {
      console.error('Error saving experience:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-primary/80">Manage your portfolio content</p>
        </div>
        <motion.a
          href="/"
          target="_blank"
          className="flex items-center gap-2 bg-accent text-light px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          <Eye className="w-4 h-4" />
          View Site
        </motion.a>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2 border-b border-primary/20"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-accent text-light'
                : 'text-primary/80 hover:text-primary hover:bg-primary/10'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-light" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{projects.length}</p>
                  <p className="text-primary/80">Projects</p>
                </div>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <Code className="w-6 h-6 text-light" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{skills.length}</p>
                  <p className="text-primary/80">Skills</p>
                </div>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-light" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{experiences.length}</p>
                  <p className="text-primary/80">Experiences</p>
                </div>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-light" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{submissions.length}</p>
                  <p className="text-primary/80">Messages</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Profile Information</h2>
              <motion.button
                onClick={openProfileModal}
                className="flex items-center gap-2 bg-accent text-light px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </motion.button>
            </div>
            {profile && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Name</label>
                  <p className="text-primary/80">{profile.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Title</label>
                  <p className="text-primary/80">{profile.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Bio</label>
                  <p className="text-primary/80">{profile.bio}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Email</label>
                  <p className="text-primary/80">{profile.email}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">Projects</h2>
              <motion.button
                onClick={() => openProjectModal()}
                className="flex items-center gap-2 bg-accent text-light px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Plus className="w-4 h-4" />
                Add Project
              </motion.button>
            </div>
            <div className="grid gap-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
                      <p className="text-primary/80 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech_stack.map((tech) => (
                          <span key={tech} className="bg-accent/20 text-accent px-2 py-1 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <motion.button
                        onClick={() => openProjectModal(project)}
                        className="p-2 bg-secondary text-light rounded-lg hover:bg-secondary/80 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => deleteProject(project.id)}
                        className="p-2 bg-red-500 text-light rounded-lg hover:bg-red-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">Skills</h2>
              <motion.button
                onClick={() => openSkillModal()}
                className="flex items-center gap-2 bg-accent text-light px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Plus className="w-4 h-4" />
                Add Skill
              </motion.button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-primary">{skill.name}</h3>
                      <p className="text-primary/80 text-sm">{skill.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => openSkillModal(skill)}
                        className="p-2 bg-secondary text-light rounded-lg hover:bg-secondary/80 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => deleteSkill(skill.id)}
                        className="p-2 bg-red-500 text-light rounded-lg hover:bg-red-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="w-full bg-primary/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-accent to-secondary h-2 rounded-full"
                      style={{ width: `${(skill.proficiency_level / 5) * 100}%` }}
                    />
                  </div>
                  <p className="text-primary/80 text-sm mt-2">Level {skill.proficiency_level}/5</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">Experience</h2>
              <motion.button
                onClick={() => openExperienceModal()}
                className="flex items-center gap-2 bg-accent text-light px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Plus className="w-4 h-4" />
                Add Experience
              </motion.button>
            </div>
            <div className="space-y-4">
              {experiences.map((experience) => (
                <div key={experience.id} className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary mb-2">{experience.position}</h3>
                      <p className="text-accent font-semibold mb-2">{experience.company}</p>
                      <p className="text-primary/80 mb-4">{experience.description}</p>
                      <p className="text-primary/60 text-sm">
                        {new Date(experience.start_date).toLocaleDateString()} - {experience.end_date ? new Date(experience.end_date).toLocaleDateString() : 'Present'}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <motion.button
                        onClick={() => openExperienceModal(experience)}
                        className="p-2 bg-secondary text-light rounded-lg hover:bg-secondary/80 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => deleteExperience(experience.id)}
                        className="p-2 bg-red-500 text-light rounded-lg hover:bg-red-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">Contact Messages</h2>
            </div>
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div key={submission.id} className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-lg font-bold text-primary">{submission.name}</h3>
                        <span className="text-primary/60 text-sm">{submission.email}</span>
                        <span className="text-primary/60 text-sm">
                          {new Date(submission.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-primary/80">{submission.message}</p>
                    </div>
                    <motion.button
                      onClick={() => deleteSubmission(submission.id)}
                      className="p-2 bg-red-500 text-light rounded-lg hover:bg-red-600 transition-colors ml-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Profile Edit Modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title="Edit Profile"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Name</label>
              <input
                type="text"
                value={profileForm.name || ''}
                onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Title</label>
              <input
                type="text"
                value={profileForm.title || ''}
                onChange={(e) => setProfileForm({...profileForm, title: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Your job title"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">Bio</label>
            <textarea
              value={profileForm.bio || ''}
              onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent h-32"
              placeholder="Tell us about yourself"
            />
          </div>

          <FileUpload
            bucket="images"
            path="profile"
            currentUrl={profileForm.profile_image_url}
            onUploadComplete={(url: string) => setProfileForm({...profileForm, profile_image_url: url})}
            onUploadError={(error: string) => showMessage('error', error)}
            previewSize="md"
            label="Profile Image"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Email</label>
              <input
                type="email"
                value={profileForm.email || ''}
                onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Location</label>
              <input
                type="text"
                value={profileForm.location || ''}
                onChange={(e) => setProfileForm({...profileForm, location: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="City, Country"
              />
            </div>
          </div>


          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Resume URL</label>
              <input
                type="url"
                value={profileForm.resume_url || ''}
                onChange={(e) => setProfileForm({...profileForm, resume_url: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="https://example.com/resume.pdf"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Facebook</label>
              <input
                type="url"
                value={profileForm.facebook || ''}
                onChange={(e) => setProfileForm({...profileForm, facebook: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="https://facebook.com/username"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveProfile}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-accent text-light rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-light border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSubmitting ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Project Modal */}
      <Modal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        title={editingItem ? 'Edit Project' : 'Add Project'}
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Title</label>
              <input
                type="text"
                value={projectForm.title || ''}
                onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Project title"
              />
            </div>
            <div>
              <FileUpload
                bucket="images"
                path="projects"
                currentUrl={projectForm.image_url}
                onUploadComplete={(url: string) => setProjectForm({...projectForm, image_url: url})}
                onUploadError={(error: string) => showMessage('error', error)}
                previewSize="lg"
                label="Project Image"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">Description</label>
            <textarea
              value={projectForm.description || ''}
              onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent h-32"
              placeholder="Project description"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">Tech Stack (comma-separated)</label>
            <input
              type="text"
              value={Array.isArray(projectForm.tech_stack) ? projectForm.tech_stack.join(', ') : (projectForm.tech_stack || '')}
              onChange={(e) => setProjectForm({...projectForm, tech_stack: e.target.value as string})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="React, Node.js, MongoDB, TypeScript"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Live URL</label>
              <input
                type="url"
                value={projectForm.live_url || ''}
                onChange={(e) => setProjectForm({...projectForm, live_url: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="https://project.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">GitHub URL</label>
              <input
                type="url"
                value={projectForm.github_url || ''}
                onChange={(e) => setProjectForm({...projectForm, github_url: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="featured"
              checked={projectForm.featured || false}
              onChange={(e) => setProjectForm({...projectForm, featured: e.target.checked})}
              className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
            />
            <label htmlFor="featured" className="text-sm font-semibold text-primary">Featured Project</label>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsProjectModalOpen(false)}
              className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveProject}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-accent text-light rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-light border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSubmitting ? 'Saving...' : (editingItem ? 'Update Project' : 'Add Project')}
            </button>
          </div>
        </div>
      </Modal>

      {/* Skill Modal */}
      <Modal
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
        title={editingItem ? 'Edit Skill' : 'Add Skill'}
        size="md"
      >
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Skill Name</label>
              <input
                type="text"
                value={skillForm.name || ''}
                onChange={(e) => setSkillForm({...skillForm, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="JavaScript"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Category</label>
              <input
                type="text"
                value={skillForm.category || ''}
                onChange={(e) => setSkillForm({...skillForm, category: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Programming Languages"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">Proficiency Level: {skillForm.proficiency_level || 1}/5</label>
            <input
              type="range"
              min="1"
              max="5"
              value={skillForm.proficiency_level || 1}
              onChange={(e) => setSkillForm({...skillForm, proficiency_level: parseInt(e.target.value)})}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsSkillModalOpen(false)}
              className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveSkill}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-accent text-light rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-light border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSubmitting ? 'Saving...' : (editingItem ? 'Update Skill' : 'Add Skill')}
            </button>
          </div>
        </div>
      </Modal>

      {/* Experience Modal */}
      <Modal
        isOpen={isExperienceModalOpen}
        onClose={() => setIsExperienceModalOpen(false)}
        title={editingItem ? 'Edit Experience' : 'Add Experience'}
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Company</label>
              <input
                type="text"
                value={experienceForm.company || ''}
                onChange={(e) => setExperienceForm({...experienceForm, company: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Company Name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Position</label>
              <input
                type="text"
                value={experienceForm.position || ''}
                onChange={(e) => setExperienceForm({...experienceForm, position: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Job Title"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">Description</label>
            <textarea
              value={experienceForm.description || ''}
              onChange={(e) => setExperienceForm({...experienceForm, description: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent h-32"
              placeholder="Describe your role and achievements"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Start Date</label>
              <input
                type="date"
                value={experienceForm.start_date || ''}
                onChange={(e) => setExperienceForm({...experienceForm, start_date: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">End Date</label>
              <input
                type="date"
                value={experienceForm.end_date || ''}
                onChange={(e) => setExperienceForm({...experienceForm, end_date: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="current"
                  checked={!experienceForm.end_date}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setExperienceForm({...experienceForm, end_date: undefined})
                    }
                  }}
                  className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                />
                <label htmlFor="current" className="text-sm text-primary">Current Position</label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsExperienceModalOpen(false)}
              className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveExperience}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-accent text-light rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-light border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSubmitting ? 'Saving...' : (editingItem ? 'Update Experience' : 'Add Experience')}
            </button>
          </div>
        </div>
      </Modal>

      {/* Message Display */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {message.text}
        </motion.div>
      )}
    </div>
  )
}