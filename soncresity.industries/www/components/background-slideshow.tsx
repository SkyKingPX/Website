"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface BackgroundVideoProps {
  interval?: number // keeping for compatibility
  className?: string
}

export function BackgroundSlideshow({ interval = 30000, className = "" }: BackgroundVideoProps) {
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const video = document.querySelector('#bg-video') as HTMLVideoElement
    if (video) {
      const handleLoadedData = () => setVideoLoaded(true)
      const handleError = () => {
        console.error('Video failed to load')
        setVideoLoaded(false)
      }
      
      video.addEventListener('loadeddata', handleLoadedData)
      video.addEventListener('error', handleError)
      
      // Force load if video is already ready
      if (video.readyState >= 2) {
        setVideoLoaded(true)
      }

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData)
        video.removeEventListener('error', handleError)
      }
    }
  }, [])

  return (
    <div className={`fixed inset-0 -z-50 overflow-hidden ${className}`}>
      {/* Fallback static image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: 'url(/bg.jpg)' }}
      />
      
      {/* Video overlay on top of image */}
      <video
        id="bg-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        controls={false}
        className="absolute inset-0 w-full h-full object-cover z-10"
        onLoadedData={() => {
          console.log('Video loaded successfully')
          setVideoLoaded(true)
        }}
        onError={(e) => {
          console.error('Video failed to load:', e)
        }}
      >
        <source src="/bg.mp4" type="video/mp4" />
        <source src="/bg.mp4" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}