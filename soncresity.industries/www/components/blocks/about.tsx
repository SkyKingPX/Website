"use client"

import {motion, type MotionValue, useAnimation} from "framer-motion"
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {sectionTopSpacing} from "@/components/variables";
import {useEffect, useRef} from "react";

export default function About() {
  const features = [
    {
      icon: <img src="/icons/modpack.png" alt="Modpack" width={24} height={24} className="h-6 w-6"/>,
      title: "Minecraft Modpacks",
    },
    {
      icon: <img src="/icons/mod.png" alt="Mod" width={24} height={24} className="h-6 w-6"/>,
      title: "Minecraft Mods",
    },
    {
      icon: <img src="/icons/plugin.png" alt="Plugin" width={24} height={24} className="h-6 w-6"/>,
      title: "Server Plugins",
    },
    {
      icon: <img src="/icons/tool.png" alt="Tool" width={24} height={24} className="h-6 w-6"/>,
      title: "Tools & Utilities",
    },
  ]

  const aboutRef = useRef<HTMLElement>(null)
  const aboutControls = useAnimation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === aboutRef.current && entry.isIntersecting) {
            aboutControls.start("visible")
          }
        })
      },
      {threshold: 0.2},
    )

    if (aboutRef.current) observer.observe(aboutRef.current)

    return () => {
      if (aboutRef.current) observer.unobserve(aboutRef.current)
    }
  }, [aboutControls])

  return(
    <motion.section
      id="about"
      ref={aboutRef}
      initial="hidden"
      animate={aboutControls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      className="relative overflow-visible py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="content-backdrop rounded-2xl p-6 sm:p-8 mx-0 sm:mx-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-serephixBold mb-4"
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.5}}
            >
              About <span className="text-primary">Soncresity Industries</span>
            </motion.h2>
            <motion.p
              className="text-lg text-foreground/80"
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.5, delay: 0.1}}
            >
              We create a variety of Minecraft content, including:
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.5, delay: index * 0.1}}
              >
                <Card className="hover-scale h-full border-border/50">
                  <CardHeader>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="font-serephixBold">{feature.title}</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="hover-scale mt-20 glass-card rounded-2xl p-8"
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.5}}
          >
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-serephixBold mb-4">Our Journey</h3>
                <p className="text-foreground/80 mb-4">
                  Story and lore of SI
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}