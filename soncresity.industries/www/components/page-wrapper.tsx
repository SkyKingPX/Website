"use client"

import { BackgroundSlideshow } from './background-slideshow'

interface PageWrapperProps {
  children: React.ReactNode
  backgroundInterval?: number
  className?: string
}

export function PageWrapper({ 
  children, 
  backgroundInterval = 30000,
  className = ""
}: PageWrapperProps) {
  return (
    <div className={`min-h-screen relative ${className}`}>
      <BackgroundSlideshow 
        interval={backgroundInterval}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}