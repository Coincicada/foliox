'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProjectImageProps {
  src: string
  fallbackSrc: string
  alt: string
  fill?: boolean
  className?: string
  sizes?: string
  unoptimized?: boolean
}

export function ProjectImage({ 
  src, 
  fallbackSrc, 
  alt, 
  fill = true, 
  className, 
  sizes, 
  unoptimized 
}: ProjectImageProps) {
  const [imageSrc, setImageSrc] = useState(src)

  const handleError = () => {
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc)
    }
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      unoptimized={unoptimized}
      onError={handleError}
    />
  )
}

