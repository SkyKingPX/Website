"use client"

import {motion} from "framer-motion";
import RotatingText from "@/components/RotatingText";
import ElectricBorder from "@/components/ElectricBorder";
import {SI_DARK_HEX_STRING} from "@/components/variables";
import {Button} from "@/components/ui/button";
import ShinyText from "@/components/ShinyText";
import {ArrowDown} from "lucide-react";
import {ProjectLogoCycler} from "@/components/project-logo-cycler";

export default function Home() {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-secondary rounded-full opacity-45 animate-pulse-slow blur-3xl"/>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{opacity: 0, x: -50}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.8}}
            className="flex flex-col gap-6 p-8 rounded-2xl content-backdrop"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serephixBold leading-tight">
              Crafting <span className="rotating-text">
                  <RotatingText
                    texts={['Exceptional', 'Advanced', 'Immersive', 'Modern', 'Creative', 'High-Quality', 'Thrilling', 'Enjoyable', 'Unique', 'Stunning', 'Epic', 'Vibrant', 'Smooth']}
                    mainClassName="bg-[#00000000] overflow-hidden py-1 justify-left rounded-lg"
                    staggerFrom={"last"}
                    initial={{y: "100%"}}
                    animate={{y: 0}}
                    exit={{y: "-120%"}}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    elementLevelClassName="!text-[#2F97DD]"
                    transition={{type: "spring", damping: 50, stiffness: 400}}
                    rotationInterval={4000}
                  />
                </span> Experiences
            </h1>

            <p className="text-lg text-foreground/80 max-w-lg font-serephixNew">
              Creators of immersive worlds, game mechanics, and stories tailored for Minecraft players and server
              communities worldwide
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <ElectricBorder
                color={SI_DARK_HEX_STRING}
                speed={0.2}
                chaos={0.2}
                thickness={3}
                style={{borderRadius: 5}}
              >
                <Button size="lg" className="hover-glow">
                  <a href="/projects">
                    <ShinyText
                      text="Explore Our Work"
                      disabled={false}
                      speed={2}
                    />
                  </a>
                </Button>
              </ElectricBorder>
              <Button size="lg" variant="outline" className="hover-scale" asChild>
                <a href="/about">
                  <ShinyText
                    text="Learn More"
                    disabled={false}
                    speed={2}
                  />
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.8, delay: 0.2}}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <motion.div
                className="relative w-full h-full rounded-2xl overflow-hidden animate-float">
                <ProjectLogoCycler
                  interval={30000}
                  offset={15000}
                  className="w-full h-full"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
