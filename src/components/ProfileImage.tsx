'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProfileImageProps {
  src: string
  alt: string
  className?: string
}

export default function ProfileImage({ src, alt, className = '' }: ProfileImageProps) {
  const [imageKey, setImageKey] = useState(0)

  const handleError = () => {
    console.log('Image failed to load, retrying...', src)
    setImageKey(prev => prev + 1)
  }

  const handleLoad = () => {
    console.log('✅ Profile image loaded successfully!')
  }

  return (
    <Image
      key={imageKey}
      src={src}
      alt={alt}
      width={400}
      height={400}
      className={`w-full h-full object-cover ${className}`}
      priority
      onError={handleError}
      onLoad={handleLoad}
    />
  )
}
