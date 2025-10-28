'use client'

import { motion } from 'framer-motion'
import { Experience as ExperienceType } from '@/lib/types'

interface ExperienceProps {
  experiences: ExperienceType[]
}

export default function Experience({ experiences }: ExperienceProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    })
  }

  if (experiences.length === 0) {
    return (
      <section id="experience" className="py-20 bg-gradient-to-br from-secondary to-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-light mb-8">
            My <span className="text-accent">Experience</span>
          </h2>
          <p className="text-light/80 text-xl">No experience available yet.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-secondary to-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D3DAD9' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-light mb-8">
            My <span className="text-accent">Experience</span>
          </h2>
          <p className="text-light/80 text-xl max-w-2xl mx-auto">
            My professional journey and the experiences that have shaped my career.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-accent/30"></div>

          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent rounded-full border-4 border-light shadow-lg z-10"></div>

              {/* Content Card */}
              <div className={`w-5/12 ${
                index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'
              }`}>
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-light font-bold text-lg">
                      {experience.company[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-light">{experience.position}</h3>
                      <p className="text-accent font-semibold">{experience.company}</p>
                    </div>
                  </div>
                  
                  <p className="text-light/80 mb-4 leading-relaxed">
                    {experience.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-light/60 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>
                      {formatDate(experience.start_date)} - {experience.end_date ? formatDate(experience.end_date) : 'Present'}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-light mb-4">Interested in Working Together?</h3>
            <p className="text-light/80 mb-6">
              I'm always open to discussing new opportunities and exciting projects.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 bg-accent text-light px-8 py-4 rounded-full font-semibold hover:bg-accent/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

