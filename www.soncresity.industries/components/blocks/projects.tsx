"use client"

import {useEffect, useRef, useState} from "react"
import {motion, useAnimation} from "framer-motion"
import {ArrowRight} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Checkbox} from "@/components/ui/checkbox"
import {useIsMobile} from "@/hooks/use-mobile"
import {projects} from "@/components/blocks/project-list"
import ShinyText from "@/components/ShinyText";
import {sectionTopSpacing} from "@/components/variables";
import {PageWrapper} from "@/components/page-wrapper";
import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";

interface ProjectsProps {
  viewall: boolean;
}

export default function Projects({viewall}: ProjectsProps) {
  const isMobile = useIsMobile()
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filterMode, setFilterMode] = useState<'AND' | 'OR'>('AND')
  
  // Extract all unique tags from projects
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags))).sort()
  
  // Filter projects based on selected tags and filter mode
  const filteredProjects = selectedTags.length === 0 
    ? projects 
    : projects.filter(project => {
        if (filterMode === 'AND') {
          return selectedTags.every(tag => project.tags.includes(tag))
        } else {
          return selectedTags.some(tag => project.tags.includes(tag))
        }
      })
      
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }
  const projectsRef = useRef<HTMLElement>(null)
  const projectsControls = useAnimation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === projectsRef.current && entry.isIntersecting) {
            projectsControls.start("visible")
          }
        })
      },
      {threshold: 0.2},
    )

    if (projectsRef.current) observer.observe(projectsRef.current)

    return () => {
      if (projectsRef.current) observer.unobserve(projectsRef.current)
    }
  }, [projectsControls])

  return (
    <motion.section
      id="projects"
      ref={projectsRef}
      initial="hidden"
      animate={projectsControls}
      variants={{
        hidden: {opacity: 0, y: 50},
        visible: {opacity: 1, y: 0, transition: {duration: 0.6}},
      }}
      className={`${sectionTopSpacing}`}
    >
      {/* Projects */}
      <div className="container mx-auto px-4">
        <div className="content-backdrop rounded-2xl p-8 mx-4">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <motion.h2
                className="text-3xl md:text-4xl font-serephixBold mb-4"
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.5}}
              >
                Our <span className="text-primary">Projects</span>
              </motion.h2>
              <motion.p
                className="text-lg text-foreground/80"
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.5, delay: 0.1}}
              >
                Discover our collection of Minecraft mods, plugins, and resource packs that have been
                downloaded by
                millions of players worldwide.
              </motion.p>
            </div>

            {/* Tag Filter */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <img src="/icons/filter.png" alt="Filter" width={16} height={16} className="h-4 w-4" />
                      Filter by Tags
                      {selectedTags.length > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {selectedTags.length}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">Filter by Tags</h4>
                        {selectedTags.length > 0 && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setSelectedTags([])}>
                            Clear All
                          </Button>
                        )}
                      </div>
                      
                      {/* Filter Mode Toggle */}
                      <div className="flex items-center justify-between p-2 bg-secondary/30 rounded-md">
                        <span className="text-xs text-muted-foreground">
                          {filterMode === 'AND' ? 'Must have ALL selected tags' : 'Must have ANY selected tag'}
                        </span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setFilterMode(filterMode === 'AND' ? 'OR' : 'AND')}
                          className="h-6 px-2 text-xs"
                        >
                          {filterMode}
                        </Button>
                      </div>
                      
                      <div className="max-h-64 overflow-y-auto space-y-2">
                        {allTags.map(tag => (
                          <div key={tag} className="flex items-center space-x-2">
                            <button
                              onClick={() => toggleTag(tag)}
                              className="flex-shrink-0"
                            >
                              <img 
                                src={selectedTags.includes(tag) ? "/icons/checkbox_checked.png" : "/icons/checkbox_unchecked.png"}
                                alt={selectedTags.includes(tag) ? "Checked" : "Unchecked"}
                                width={16}
                                height={16}
                                className="h-4 w-4"
                              />
                            </button>
                            <label 
                              onClick={() => toggleTag(tag)}
                              className="text-sm cursor-pointer flex-1"
                            >
                              {tag}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="text-center text-foreground/70 italic py-12">
                <p>No Projects found with the selected tags!</p>
                <p>Try adjusting your filter criteria or clearing all filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.5, delay: index * 0.1}}
                  >
                    <Card className="overflow-hidden hover-scale h-full border-border/50">
                      <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-t-lg">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge className="text-xs">
                            {project.category}
                          </Badge>
                          {project.partner &&
                            <Badge variant="green" className="text-xs">
                              Partner
                            </Badge>
                          }
                          {project.tags.map((tag, i) => {
                            // Determine badge variant based on tag
                            let variant: "outline" | "minecraft" | "vintageStory" | "game" | "unrealEngine" = "outline"
                            if (tag === "Minecraft") variant = "minecraft"
                            else if (tag === "Vintage Story") variant = "vintageStory"
                            else if (tag === "Game") variant = "game"
                            else if (tag === "Unreal Engine") variant = "unrealEngine"
                            
                            return (
                              <Badge key={i} variant={variant} className="text-xs">
                                {tag}
                              </Badge>
                            )
                          })}
                        </div>
                        <CardTitle className="font-serephixBold">{project.title}</CardTitle>
                        <CardDescription
                          className="text-foreground/70">{project.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <div className="flex gap-2">
                          {project.links.github && project.links.github.trim() !== "" ?
                            <Button size="sm" variant="ghost" className="w-9 h-9 p-0" asChild>
                              <a href={project.links.github} target="_blank"
                                 rel="noopener noreferrer">
                                <img src="/icons/github.png" alt="GitHub" width={20}
                                     height={20}
                                     className="invert-on-dark h-5 w-5"/>
                                <span className="sr-only">GitHub</span>
                              </a>
                            </Button> : null
                          }
                          {project.links.curseforge && project.links.curseforge.trim() !== "" ?
                            <Button size="sm" variant="ghost" className="w-9 h-9 p-0" asChild>
                              <a href={project.links.curseforge} target="_blank"
                                 rel="noopener noreferrer">
                                <img src="/icons/curseforge.png" alt="CurseForge"
                                     width={20} height={20}
                                     className="h-5 w-5"/>
                                <span className="sr-only">CurseForge</span>
                              </a>
                            </Button> : null
                          }
                          {project.links.modrinth && project.links.modrinth.trim() !== "" ?
                            <Button size="sm" variant="ghost" className="w-9 h-9 p-0" asChild>
                              <a href={project.links.modrinth} target="_blank"
                                 rel="noopener noreferrer">
                                <img src="/icons/modrinth.png" alt="Modrinth"
                                     className="h-5 w-5"/>
                                <span className="sr-only">Modrinth</span>
                              </a>
                            </Button> : null
                          }
                        </div>
                        <Button size="sm" variant="default" className="gap-1" asChild>
                          {project.wikiid && project.wikiid.trim() !== "" && (
                              <a href={`https://wiki.soncresity.industries/${project.wikiid}`}><ShinyText
                                text="Wiki"
                                disabled={false}
                                speed={2}
                              /><ArrowRight size={14}/></a>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {viewall && (
            <div className="mt-12 text-center">
              <a href="/projects">
                <Button size="lg" variant="outline" className="hover-scale">
                  <ShinyText
                    text="View All Projects"
                    disabled={false}
                    speed={3}
                  />
                  <ArrowRight size={16} className="ml-2"/>
                </Button>
              </a>
            </div>
          )}

        </div>
      </div>
    </motion.section>
  )
}
