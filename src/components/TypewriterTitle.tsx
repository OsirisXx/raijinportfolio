'use client'

import { useState, useEffect } from 'react'

interface TypewriterTitleProps {
  titles: string[]
  className?: string
}

export default function TypewriterTitle({ titles, className = '' }: TypewriterTitleProps) {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex]
    
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, 2000) // Pause for 2 seconds before deleting
      
      return () => clearTimeout(pauseTimeout)
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentTitle.length) {
          setCurrentText(currentTitle.slice(0, currentText.length + 1))
        } else {
          // Finished typing, pause then start deleting
          setIsPaused(true)
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          // Finished deleting, move to next title
          setIsDeleting(false)
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length)
        }
      }
    }, isDeleting ? 50 : 100) // Faster deletion, slower typing

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, isPaused, currentTitleIndex, titles])

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}





