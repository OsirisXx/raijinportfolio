'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Profile } from '@/lib/types'
import { Mail, MapPin, Copy, Check } from 'lucide-react'

interface ContactProps {
  profile: Profile
}

export default function Contact({ profile }: ContactProps) {
  const [emailCopied, setEmailCopied] = useState(false)

  const copyEmailToClipboard = async () => {
    if (profile.email) {
      try {
        await navigator.clipboard.writeText(profile.email)
        setEmailCopied(true)
        setTimeout(() => setEmailCopied(false), 2000) // Reset after 2 seconds
      } catch (err) {
        console.error('Failed to copy email:', err)
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = profile.email
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        setEmailCopied(true)
        setTimeout(() => setEmailCopied(false), 2000)
      }
    }
  }

  return (
    <section id="contact" className="py-20 bg-light">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-8">
            Get In <span className="text-accent">Touch</span>
          </h2>
          <p className="text-primary/80 text-xl max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6 text-center">Let's Connect</h3>
              <p className="text-primary/80 text-lg mb-8 text-center leading-relaxed">
                I'm always excited to connect with fellow creators, potential collaborators, and anyone with an interesting project idea! Whether you're looking to build something amazing, need help with development, or just want to chat about technology, I'd love to hear from you. I'm most active on TikTok and Facebook, and I typically reply instantly via social media and emails. Let's bring your ideas to life together!
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {profile.email && (
                <motion.button
                  onClick={copyEmailToClipboard}
                  className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl hover:bg-white/70 transition-colors w-full text-left cursor-pointer group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-light transition-colors ${
                    emailCopied ? 'bg-green-500' : 'bg-accent group-hover:bg-accent/80'
                  }`}>
                    {emailCopied ? <Check className="w-6 h-6" /> : <Mail className="w-6 h-6" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-primary flex items-center gap-2">
                      Email
                      {emailCopied && (
                        <span className="text-green-600 text-sm">✓ Copied!</span>
                      )}
                    </p>
                    <p className="text-primary/80">{profile.email}</p>
                    <p className="text-xs text-primary/60 mt-1">
                      {emailCopied ? 'Email copied to clipboard!' : 'Click to copy email'}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Copy className="w-4 h-4 text-primary/60" />
                  </div>
                </motion.button>
              )}

              {profile.location && (
                <motion.div
                  className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-light">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Location</p>
                    <p className="text-primary/80">{profile.location}</p>
                  </div>
                </motion.div>
              )}

              {profile.facebook && (
                <motion.a
                  href={profile.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl hover:bg-white/70 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Facebook</p>
                    <p className="text-primary/80">@raijin.offi</p>
                  </div>
                </motion.a>
              )}

              <motion.a
                href="https://www.tiktok.com/@theonlyraijin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl hover:bg-white/70 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-primary">TikTok</p>
                  <p className="text-primary/80">@theonlyraijin</p>
                </div>
              </motion.a>

              <motion.div
                className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-primary">Response Time</p>
                  <p className="text-primary/80">Instant replies on social media & email</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              {profile.github && (
                <motion.a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary text-light rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </motion.a>
              )}
              
              {profile.linkedin && (
                <motion.a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary text-light rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
