"use client"

import {motion} from "framer-motion"
import {
  ExternalLink,
} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Separator} from "@/components/ui/separator"
import {LINKS} from "@/components/blocks/links";
import ShinyText from "@/components/ShinyText";

export default function Footer() {

  return (
    <footer className="glass-card border-t pt-10 pb-8">
      <div className="container mx-auto px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div
            className="max-w-sm"
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.5}}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <img
                  src="/logo.png"
                  alt="SI Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-serephixBold text-2xl">Soncresity Industries</span>
            </div>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Creators of immersive worlds, game mechanics, and stories tailored for Minecraft players and server
              communities worldwide
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="ghost" className="rounded-full hover-glow" asChild>
                <a href={`${LINKS.youtube_channel}`} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <img src="/icons/youtube.png" alt="YouTube"
                       width={20} height={20}
                       className="h-5 w-5"/>
                </a>
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full hover-glow" asChild>
                <a href={`${LINKS.instagram}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <img src="/icons/instagram.png" alt="Instagram"
                       width={20} height={20}
                       className="h-5 w-5"/>
                </a>
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full hover-glow" asChild>
                <a href={`${LINKS.curseforge_profile}`} target="_blank" rel="noopener noreferrer" aria-label="CurseForge">
                  <img src="/icons/curseforge.png" alt="CurseForge"
                       width={20} height={20}
                       className="h-5 w-5"/>
                </a>
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full hover-glow" asChild>
                <a href={`${LINKS.modrinth_org}`} target="_blank" rel="noopener noreferrer" aria-label="Modrinth">
                  <img src="/icons/modrinth.png" alt="Modrinth"
                       width={20} height={20}
                       className="h-5 w-5"/>
                </a>
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full hover-glow" asChild>
                <a href="mailto:info@soncresity.dev" aria-label="Email">
                  <img src="/icons/mail.png" alt="Email"
                       width={20} height={20}
                       className="h-5 w-5"/>
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.5, delay: 0.1}}
          >
            <h3 className="font-serephixBold text-lg mb-6 flex items-center gap-2">
              <img src="/icons/code.png" alt="Code" width={18} height={18} className="h-[18px] w-[18px]"/>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/about"
                  className="text-foreground/70 hover:text-primary transition-colors hover-lift inline-flex items-center gap-2 group"
                >
                  About Us
                  <ExternalLink size={14}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                </a>
              </li>
              <li>
                <a
                  href="/projects/"
                  className="text-foreground/70 hover:text-primary transition-colors hover-lift inline-flex items-center gap-2 group"
                >
                  Our Projects
                  <ExternalLink size={14}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                </a>
              </li>
              <li>
                <a
                  href="/team"
                  className="text-foreground/70 hover:text-primary transition-colors hover-lift inline-flex items-center gap-2 group"
                >
                  Team
                  <ExternalLink size={14}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                </a>
              </li>
              <li>
                <a
                  href="https://support.soncresity.industries"
                  target="_blank"
                  className="text-foreground/70 hover:text-primary transition-colors hover-lift inline-flex items-center gap-2 group"
                >
                  Support
                  <ExternalLink size={14}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                </a>
              </li>
              <li>
                <a
                  href="/map"
                  className="text-foreground/70 hover:text-primary transition-colors hover-lift inline-flex items-center gap-2 group"
                >
                  Sodonia World Map
                  <ExternalLink size={14}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Discord Community */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.5, delay: 0.3}}
            className="max-w-sm"
          >
            <h3 className="font-serephixBold text-lg mb-6 flex items-center gap-2">
              <img src="/icons/chat.png" alt="Chat" width={24} height={24} className="h-6 w-6"/>
              Join Our Community
            </h3>

            {/* Discord Server Box */}
            <div
              className="glass-card rounded-xl p-6 hover-scale">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <img src="/icons/discord.png" alt="Discord" width={24} height={24} className="h-6 w-6"/>
                </div>
                <div>
                  <h4 className="font-serephixBold text-foreground">Discord Server</h4>
                  <p className="text-sm text-foreground/60">Join our community</p>
                </div>
              </div>
              <p className="text-sm text-foreground/70 mb-4">
                Connect with other developers, get support, and stay updated with the latest news.
              </p>
              <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white" asChild>
                <a href={`${LINKS.discord}`} target="_blank" rel="noopener noreferrer">
                  <ShinyText
                    text="Join Discord Server"
                    disabled={false}
                    speed={3}
                  />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        <Separator className="bg-accent mb-8"/>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-foreground/60">
            <p><img src="/icons/copyright.png" alt="Copyright" width={14} height={14} className="h-[14px] w-[14px] inline"/> {new Date().getFullYear()} Soncresity Industries | All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
