'use client'

import Image from 'next/image'
import { Fragment, useState, useRef, useEffect } from 'react'
import { Project } from '@/lib/types'

interface ProjectCarouselProps {
  projects: Project[]
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const cardsRef = useRef<HTMLDivElement>(null)

  if (projects.length === 0) {
    return (
      <section id="projects" className="py-20 bg-gradient-to-br from-secondary to-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-light mb-8">
            My <span className="text-accent">Projects</span>
          </h2>
          <p className="text-light/80 text-xl">No projects available yet.</p>
        </div>
      </section>
    )
  }

  const rotationAngles = [
    '4deg', '-8deg', '-7deg', '11deg', '13deg', '-17deg', '20deg', 
    '-4deg', '8deg', '7deg', '-11deg', '-13deg', '17deg', '-20deg'
  ]

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(false)
    dragStartX.current = e.clientX
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartX.current !== 0) {
      const diff = Math.abs(e.clientX - dragStartX.current)
      if (diff > 5) {
        setIsDragging(true)
      }
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current !== 0) {
      const diff = dragStartX.current - e.clientX
      const threshold = 50

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          setSelectedIndex((prev) => (prev + 1) % projects.length)
        } else {
          setSelectedIndex((prev) => (prev - 1 + projects.length) % projects.length)
        }
      }
    }

    dragStartX.current = 0
    setIsDragging(false)
  }

  useEffect(() => {
    const radio = document.getElementById(`radio-${selectedIndex + 1}`) as HTMLInputElement
    if (radio) {
      radio.checked = true
    }
  }, [selectedIndex])

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-secondary to-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D3DAD9' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl lg:text-5xl font-bold text-light mb-8 text-center">
          My <span className="text-accent">Projects</span>
        </h2>
        <p className="text-light/80 text-xl max-w-2xl mx-auto text-center mb-16">
          Here are some of my recent projects that showcase my skills and passion for development.
        </p>
        
        <div 
          className="cards"
          ref={cardsRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {projects.map((project, index) => {
            const rotationAngle = rotationAngles[index % rotationAngles.length]
            const nextIndex = (index + 1) % projects.length
            const prevIndex = (index - 1 + projects.length) % projects.length
            
            return (
              <Fragment key={project.id}>
                <input 
                  type="radio" 
                  id={`radio-${index + 1}`} 
                  name="radio-card" 
                  defaultChecked={index === 0}
                />
                <article 
                  className="card" 
                  style={{ '--angle': rotationAngle } as React.CSSProperties}
                >
                  {project.image_url ? (
                    <Image 
                      className="card-img" 
                      src={project.image_url} 
                      alt={project.title}
                      width={260}
                      height={260}
                    />
                  ) : (
                    <div className="card-img placeholder-img">🚀</div>
                  )}
                  
                  <div className="card-data">
                    <span className="card-num">{index + 1}/{projects.length}</span>
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                    
                    {/* Tech Stack */}
                    {project.tech_stack && project.tech_stack.length > 0 && (
                      <div className="tech-stack">
                        <h4 className="tech-stack-title">Tech Stack:</h4>
                        <div className="tech-stack-chips">
                          {project.tech_stack.slice(0, 6).map((tech, techIndex) => (
                            <span key={tech} className="tech-chip">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <footer>
                      <label htmlFor={`radio-${prevIndex + 1}`} aria-label="Previous">&#10094;</label>
                      <label htmlFor={`radio-${nextIndex + 1}`} aria-label="Next">&#10095;</label>
                    </footer>
                  </div>
                </article>
              </Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}
