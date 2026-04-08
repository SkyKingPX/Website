"use client"

import {useState, useEffect} from "react"
import {motion, useScroll} from "framer-motion"
import {Menu, X} from "lucide-react"
import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"

export default function Header() {
  const {scrollYProgress} = useScroll()

  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Update header style on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setIsScrolled(latest > 0.05)
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  const navItems = [
    {name: "Home", href: "/"},
    {name: "About", href: "/about"},
    {name: "Projects", href: "/projects"},
    {name: "Socials", href: "/socials"},
    {name: "Team", href: "/team"},
    {name: "Help", href: "/help"},
    {name: "Wiki", href  "https://wiki.soncresity.industries"},
    {name: "Utilities", href: "/utils"},
    {name: "Partners", href: "/partners"},
  ]

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 theme-transition",
        isScrolled ? "content-backdrop border-b-4 border-[rgba(3,5,10,0.5)] py-3" : "content-backdrop py-5",
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="relative flex-shrink-0 w-10 h-10 sm:w-8 sm:h-8">
            <img
              src="/logo.png"
              alt="SI Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-serephixBold text-xl">Soncresity Industries</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors hover-lift"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Mobile Navigation Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X/> : <Menu/>}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden absolute top-full left-0 w-full content-backdrop border-b-4 border-[rgba(3,5,10,0.5)]"
          initial={{opacity: 0, height: 0}}
          animate={{opacity: 1, height: "auto"}}
          exit={{opacity: 0, height: 0}}
        >
          <nav className="container py-4 flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="py-3 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  )
}
