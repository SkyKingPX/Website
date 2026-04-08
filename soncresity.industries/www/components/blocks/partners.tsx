"use client"

import {motion} from "framer-motion"
import {ArrowRight, Code, ExternalLink, Package, Server} from "lucide-react";
import {sectionTopSpacing} from "@/components/variables";
import {Button} from "@/components/ui/button";
import {LINKS} from "@/components/blocks/links";
import ShinyText from "@/components/ShinyText";
import ElectricBorder from "@/components/ElectricBorder";

export default function Partners() {
  return (
    <section id="partners" className={`py-10 md:py-22 relative overflow-hidden ${sectionTopSpacing}`}>
      <section id="kh">
        <div className="container mx-auto px-4">
          <div className="content-backdrop rounded-2xl p-8 mx-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-serephixBold mb-4"
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.5}}
              >
                Our <span className="text-primary">Partners</span>
              </motion.h2>
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-4"
                initial={{opacity: 0, y: 15}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.5}}
              >

                <img src="/partners/kinetic-logo.png"
                     alt="KineticHosting Logo"
                     className="w-16 h-16 mr-4 inline-block"
                />
                <span
                  className="bg-gradient-to-r from-[#5A4FCF] via-[#7868E6] to-[#A29BFE] text-transparent bg-clip-text">KineticHosting</span>
              </motion.h2>
              <motion.p
                className="text-lg text-foreground/80"
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.5, delay: 0.1}}
              >
                We are partnered with KineticHosting to provide you with the best Minecraft server
                hosting
                experience.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{opacity: 0, x: -30}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: true}}
                transition={{duration: 0.6}}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold"><span
                  className="bg-gradient-to-r from-[#5A4FCF] via-[#7868E6] to-[#A29BFE] text-transparent bg-clip-text">Premium Game Server Hosting</span>
                </h3>
                <p className="text-foreground/80">
                  KineticHosting is a premium game server hosting provider specializing in Minecraft
                  servers with a
                  reputation for reliability, performance, and exceptional customer service. As a
                  trusted
                  partner for
                  gaming communities worldwide, they deliver high-quality hosting solutions designed
                  to
                  keep your gameplay
                  smooth and uninterrupted.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Server className="h-5 w-5 text-[#5A4FCF] mt-1"/>
                    <div>
                      <h4 className="font-medium">High-Performance Hardware</h4>
                      <p className="text-sm text-foreground/70">Powered by cutting-edge server
                        infrastructure with
                        powerful CPUs and high-speed NVMe SSDs for optimal performance and
                        minimal
                        lag.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-[#5A4FCF] mt-1"/>
                    <div>
                      <h4 className="font-medium">Complete Minecraft Support</h4>
                      <p className="text-sm text-foreground/70">Full compatibility with all
                        Minecraft
                        versions (Java and
                        Bedrock) and comprehensive modpack support with easy installations.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Code className="h-5 w-5 text-[#5A4FCF] mt-1"/>
                    <div>
                      <h4 className="font-medium">User-Friendly Experience</h4>
                      <p className="text-sm text-foreground/70">Intuitive control panel for
                        effortless
                        server management
                        with instant setup and full configuration access.</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start mt-12 gap-4">
                  <ElectricBorder
                    color="#5A4FCF"
                    speed={0.2}
                    chaos={0.2}
                    thickness={3}
                    style={{borderRadius: 5}}
                  >
                    <Button
                      className="bg-gradient-to-r from-[#5A4FCF] via-[#7868E6] to-[#A29BFE] hover:bg-gradient-to-r from-[#5A4FCF] via-[#7868E6] to-[#A29BFE] text-white hover-scale"
                      asChild>
                      <a href={`${LINKS.kinetic_affiliate}`} target="_blank"
                         rel="noopener noreferrer">
                        <ShinyText
                          text="Get Started"
                          disabled={false}
                          speed={2}
                        />
                        <ArrowRight className="ml-2 h-4 w-4"/>
                      </a>
                    </Button>
                  </ElectricBorder>
                  <Button variant="outline" className="hover-scale hover:bg-[#7868E6]" asChild>
                    <a href="https://www.kinetichosting.net/game-servers/minecraft/order"
                       target="_blank"
                       rel="noopener noreferrer">
                      View Hosting Plans <ExternalLink size={16} className="ml-2"/>
                    </a>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{opacity: 0, x: 30}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: true}}
                transition={{duration: 0.6, delay: 0.2}}
                className="relative"
              >
                <div
                  className="relative overflow-hidden rounded-xl glass-card theme-transition">
                  <div
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5A4FCF] via-[#7868E6] to-[#A29BFE]"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">Why Choose KineticHosting?</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5A4FCF]"></div>
                        <span className="text-sm">24/7 dedicated customer support team</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5A4FCF]"></div>
                        <span className="text-sm">Flexible plans starting from $3.99</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5A4FCF]"></div>
                        <span className="text-sm">No long-term contracts required</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5A4FCF]"></div>
                        <span className="text-sm">Unlimited plugin compatibility</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5A4FCF]"></div>
                        <span className="text-sm">Simple one-click backups</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5A4FCF]"></div>
                        <span className="text-sm">Easy server splits functionality</span>
                      </li>
                    </ul>

                    <div className="mt-6 p-4 rounded-lg bg-[#5A4FCF]/5 border border-[#5A4FCF]/10">
                      <p className="text-sm italic text-center text-foreground/80">
                        "KineticHosting's commitment to performance, reliability and customer
                        satisfaction makes them an
                        ideal partner for hosting your Minecraft server."
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
