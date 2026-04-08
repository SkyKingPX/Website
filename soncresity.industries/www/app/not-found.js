'use client'

import {useState, useEffect} from 'react'
import Link from 'next/link'
import {ArrowLeft, Home} from 'lucide-react'
import {motion} from 'framer-motion'
import {Button} from '@/components/ui/button'
import Header from '@/components/blocks/header'
import Footer from '@/components/blocks/footer'
import {PageWrapper} from "../components/page-wrapper";

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/'
    }
  }

  return (
    <PageWrapper>
      <div className="flex flex-col overflow-x-hidden">
        <Header/>

        <main className="flex-grow flex items-center justify-center min-h-screen">
          <div className="max-w-md w-full mx-auto text-center">
            <motion.div
              initial={{scale: 0.8, opacity: 0}}
              animate={{scale: 4, opacity: 1}}
              transition={{duration: 0.5}}
              className="mb-8 relative mx-auto"
            >
              <h1 className="text-8xl font-serephixBold text-primary">404</h1>
            </motion.div>

            <motion.div
              initial={{y: 20, opacity: 0}}
              animate={{y: 0, opacity: 1}}
              transition={{delay: 0.2, duration: 0.5}}
            >
              <h1 className="text-3xl font-serephixBold mb-2 text-primary">Page not found</h1>
              <p className="text-muted-foreground mb-6 font-serephixNew">
                The requested page could not be found. It may have been removed, renamed, or is temporarily
                unavailable.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="gap-2 hover-lift"
                >
                  <ArrowLeft className="h-4 w-4"/>
                  Back
                </Button>
                <Link href="/">
                  <Button className="gap-2 hover:bg-accent/90 hover-lift w-full">
                    <Home className="h-4 w-4"/>
                    Home
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer/>
      </div>
    </PageWrapper>
  )
}
