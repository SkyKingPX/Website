
"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useAnimation } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Github,
  Globe,
  Instagram,
  Twitch,
  Youtube,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type Social = {
  github?: string
  youtube?: string
  twitch?: string
  instagram?: string
  website?: string
}

type Member = {
  name: string
  role: string
  image: string
  bio: string
  skills: string[]
  social: Social
}

const teamMembers: Member[] = [
  {
    name: "Kalarian Athecila",
    role: "CEO & Founder",
    image: "/team/kalarianathecila.png?height=200&width=200",
    bio: "A passionate Minecraft mod and OS developer.",
    skills: [
      "Java",
      "C#",
      "C++",
      "JS",
      "CSS",
      "HTML",
      "Node.js",
      "Python",
      "Electron",
      ".NET",
      "React",
    ],
    social: {
      github: "https://github.com/KalarianAthecila",
      youtube: "https://www.youtube.com/@KalarianAthecila",
      twitch: "#",
      instagram: "https://www.instagram.com/kalarianathecila",
      website: "#",
    },
  },
  {
    name: "SkyKing_PX",
    role: "Lead Developer",
    image: "/team/skyking_px.png?height=200&width=200",
    bio: "A young German developer with a passion for Minecraft and coding.",
    skills: ["Java", "Next.js", "Modding", "PC Hardware"],
    social: {
      github: "https://github.com/SkyKingPX",
      youtube: "https://www.youtube.com/@SkyKingPX",
      twitch: "https://www.twitch.tv/skyking_px",
      website: "#",
      instagram: "#",
    },
  },
  {
    name: "Jovalot",
    role: "Beta Tester",
    image: "/team/jovalot.png?height=200&width=200",
    bio: "A dedicated beta tester ensuring quality and reliability of Soncresity Industries projects.",
    skills: ["Quality Assurance", "Bug Testing", "User Experience"],
    social: {
      github: "#",
      youtube: "#",
      twitch: "#",
      website: "#",
      instagram: "#",
    },
  },
]

export default function Team() {
  // For md+ horizontal scroll
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollByAmount = (amount: number) => {
    const el = scrollContainerRef.current
    if (!el) return
    el.scrollBy({ left: amount, behavior: "smooth" })
  }

  const scrollLeft = () => scrollByAmount(-320)
  const scrollRight = () => scrollByAmount(320)

  // Intersection animation trigger
  const teamControls = useAnimation()
  const teamRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === teamRef.current && entry.isIntersecting) {
            teamControls.start("visible")
          }
        })
      },
      { threshold: 0.2 }
    )

    if (teamRef.current) observer.observe(teamRef.current)
    return () => {
      if (teamRef.current) observer.unobserve(teamRef.current)
    }
  }, [teamControls])

  // ----- Mobile carousel state (sm screens) -----
  const [index, setIndex] = useState(0)
  const count = teamMembers.length

  const next = () => setIndex((i) => (i + 1) % count)
  const prev = () => setIndex((i) => (i - 1 + count) % count)

  // Support keyboard arrows on mobile carousel
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [count])

  // For swipe gestures via framer-motion drag
  const swipeThreshold = 60 // px

  const slideVariants = useMemo(
    () => ({
      enter: (direction: number) => ({
        x: direction > 0 ? 80 : -80,
        opacity: 0,
      }),
      center: {
        x: 0,
        opacity: 1,
      },
      exit: (direction: number) => ({
        x: direction > 0 ? -80 : 80,
        opacity: 0,
      }),
    }),
    []
  )

  const [direction, setDirection] = useState(0)
  const handleNext = () => {
    setDirection(1)
    next()
  }
  const handlePrev = () => {
    setDirection(-1)
    prev()
  }

  // ----- Render -----
  return (
    <section id="team" className="relative overflow-visible pt-8 pb-2" >
      <motion.div
        ref={teamRef}
        initial="hidden"
        animate={teamControls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <div className="container mx-auto px-4">
          <div className="content-backdrop rounded-2xl p-6 sm:p-8 mx-0 sm:mx-4">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-serephixBold mb-3 sm:mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Meet Our <span className="text-primary">Team</span>
              </motion.h2>
              <motion.p
                className="text-base sm:text-lg text-foreground/80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Meet the talented individuals at Soncresity Industries
              </motion.p>
            </div>

            {/* ---- Mobile: single-card carousel ---- */}
            <div className="md:hidden">
              <div className="relative w-full">
                <AnimatePresence custom={direction} initial={false} mode="popLayout">
                  <motion.div
                    key={index}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -swipeThreshold) {
                        handleNext()
                      } else if (info.offset.x > swipeThreshold) {
                        handlePrev()
                      }
                    }}
                    className="mx-auto w-full max-w-sm"
                  >
                    <MemberCard member={teamMembers[index]} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls below card */}
              <div className="mt-6 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={handlePrev}
                    className="rounded-full"
                    aria-label="Previous team member"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleNext}
                    className="rounded-full"
                    aria-label="Next team member"
                  >
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>

                {/* Dots */}
                <div className="flex gap-2 mt-1" aria-label="Slide indicators">
                  {teamMembers.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > index ? 1 : -1)
                        setIndex(i)
                      }}
                      className={[
                        "h-2.5 w-2.5 rounded-full transition-colors",
                        i === index ? "bg-accent" : "bg-foreground/30 hover:bg-foreground/50",
                      ].join(" ")}
                      aria-label={`Go to member ${i + 1}`}
                      aria-current={i === index ? "true" : "false"}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ---- Desktop: horizontal scroller with snap ---- */}
            <div className="hidden md:block">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-serephixBold">Team Members</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollLeft}
                    className="rounded-full hover-lift"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft size={18} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollRight}
                    className="rounded-full hover-lift"
                    aria-label="Scroll right"
                  >
                    <ChevronRight size={18} />
                  </Button>
                </div>
              </div>

              <div
                ref={scrollContainerRef}
                className="hide-scrollbar grid grid-flow-col auto-cols-[minmax(260px,320px)] gap-6 overflow-x-auto snap-x snap-mandatory px-1 py-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                role="region"
                aria-label="Team members horizontal scroller"
              >
                {teamMembers.map((member, i) => (
                  <motion.div
                    key={member.name + i}
                    className="snap-start"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <MemberCard member={member} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function MemberCard({ member }: { member: Member }) {
  return (
    <Card className="h-full hover-scale border-border/50 w-72 max-w-sm mx-auto">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
            <AvatarFallback>
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle>{member.name}</CardTitle>
        <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
      </CardHeader>

      <CardContent className="text-center">
        <p className="text-foreground/70 mb-4">{member.bio}</p>
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {member.skills.map((skill, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-center gap-3">
        {member.social.github && member.social.github !== "#" && (
          <Button size="sm" variant="ghost" className="w-9 h-9 p-0 rounded-full hover-glow" asChild>
            <a href={member.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={16} />
            </a>
          </Button>
        )}
        {member.social.website && member.social.website !== "#" && (
          <Button size="sm" variant="ghost" className="w-9 h-9 p-0 rounded-full hover-glow" asChild>
            <a href={member.social.website} target="_blank" rel="noopener noreferrer" aria-label="Website">
              <Globe size={16} />
            </a>
          </Button>
        )}
        {member.social.youtube && member.social.youtube !== "#" && (
          <Button size="sm" variant="ghost" className="w-9 h-9 p-0 rounded-full hover-glow" asChild>
            <a href={member.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube size={16} />
            </a>
          </Button>
        )}
        {member.social.twitch && member.social.twitch !== "#" && (
          <Button size="sm" variant="ghost" className="w-9 h-9 p-0 rounded-full hover-glow" asChild>
            <a href={member.social.twitch} target="_blank" rel="noopener noreferrer" aria-label="Twitch">
              <Twitch size={16} />
            </a>
          </Button>
        )}
        {member.social.instagram && member.social.instagram !== "#" && (
          <Button size="sm" variant="ghost" className="w-9 h-9 p-0 rounded-full hover-glow" asChild>
            <a
              href={member.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
