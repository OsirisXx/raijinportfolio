'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Skill } from '@/lib/types'

interface SkillsProps {
  skills: Skill[]
}

export default function Skills({ skills }: SkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  
  const categories = ['All', ...Array.from(new Set(skills.map(skill => skill.category)))]
  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)

  const getProficiencyColor = (level: number) => {
    if (level >= 4) return 'text-green-400'
    if (level >= 3) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getProficiencyWidth = (level: number) => {
    return `${(level / 5) * 100}%`
  }

  if (skills.length === 0) {
    return (
      <section id="skills" className="py-20 bg-light">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-8">
            My <span className="text-accent">Skills</span>
          </h2>
          <p className="text-primary/80 text-xl">No skills available yet.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="py-20 bg-light">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-8">
            My <span className="text-accent">Skills</span>
          </h2>
          <p className="text-primary/80 text-xl max-w-2xl mx-auto">
            Here are the technologies and tools I work with. I'm always learning and expanding my skill set.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                selectedCategory === category
                  ? 'bg-accent text-light'
                  : 'bg-white text-primary hover:bg-accent/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Scrollable Container */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Scrollable Skills Grid */}
          <div className="max-h-[600px] overflow-y-auto overflow-x-hidden pr-2 skills-scrollbar">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-accent/20"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {skill.icon_url ? (
                        <img
                          src={skill.icon_url}
                          alt={skill.name}
                          className="w-8 h-8 rounded-lg"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center text-light font-bold text-sm shadow-md">
                          {skill.name[0]}
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-primary">{skill.name}</h3>
                    </div>
                    <span className="text-xs text-primary/70 bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                      {skill.category}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-primary/80 font-medium">Proficiency</span>
                      <span className={`text-sm font-bold px-2 py-1 rounded-full ${getProficiencyColor(skill.proficiency_level)} bg-current/10`}>
                        {skill.proficiency_level}/5
                      </span>
                    </div>
                    
                    <div className="relative">
                      <div className="w-full bg-primary/10 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-accent via-accent/80 to-secondary h-3 rounded-full shadow-sm"
                          initial={{ width: 0 }}
                          whileInView={{ width: getProficiencyWidth(skill.proficiency_level) }}
                          transition={{ duration: 1.2, delay: index * 0.05, ease: "easeOut" }}
                          viewport={{ once: true }}
                        />
                      </div>
                      {/* Skill level indicators */}
                      <div className="flex justify-between mt-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`w-1 h-1 rounded-full ${
                              level <= skill.proficiency_level ? 'bg-accent' : 'bg-primary/20'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Scroll indicator */}
          {filteredSkills.length > 6 && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-t from-light to-transparent h-8 w-full pointer-events-none">
              <div className="flex justify-center items-end h-full pb-2">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-accent/60 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-accent/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-1 bg-accent/20 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-6">Skills Overview</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  {skills.filter(skill => skill.proficiency_level >= 4).length}
                </div>
                <div className="text-primary/80">Expert Level</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  {skills.filter(skill => skill.proficiency_level >= 3).length}
                </div>
                <div className="text-primary/80">Proficient</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  {categories.length - 1}
                </div>
                <div className="text-primary/80">Categories</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

