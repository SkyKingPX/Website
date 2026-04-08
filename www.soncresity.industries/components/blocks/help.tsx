"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, MessageCircle, Mail, FileText } from "lucide-react"

export default function Help() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const helpCategories = [
    {
      title: "General Support",
      description: "Get help with general questions and issues",
      icon: <MessageCircle className="w-6 h-6" />,
      items: [
        "Account questions",
        "General inquiries",
        "Technical support",
        "Bug reports"
      ]
    },
    {
      title: "Project Documentation",
      description: "Find documentation for our projects and tools",
      icon: <FileText className="w-6 h-6" />,
      items: [
        "Project guides",
        "API documentation",
        "Installation instructions",
        "Usage examples"
      ]
    },
    {
      title: "Contact Support",
      description: "Reach out to our team directly",
      icon: <Mail className="w-6 h-6" />,
      items: [
        "Email support",
        "Discord community",
        "GitHub issues",
        "Social media"
      ]
    }
  ]

  const quickLinks = [
    { name: "Wiki", href: "https://wiki.soncresity.industries", icon: <FileText className="w-4 h-4" /> },
    { name: "Projects", href: "/projects", icon: <ExternalLink className="w-4 h-4" /> },
    { name: "Utilities", href: "/utils", icon: <ExternalLink className="w-4 h-4" /> },
  ]

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <Badge variant="secondary" className="h-8 w-50 mb-4 font-semibold">
              Help & Support
            </Badge>
          </motion.div>
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-serephixBold mb-6"
          >
            How can we <span className="text-primary">help</span> you?
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-foreground/70 max-w-2xl mx-auto"
          >
            Find answers, get support, and learn more about our projects and services.
          </motion.p>
        </motion.div>

        {/* Help Categories */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {helpCategories.map((category, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full hover-lift theme-transition">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-accent-dark/60 text-primary">
                      {category.icon}
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-foreground/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="text-center"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-2xl font-serephixBold mb-8"
          >
            Quick Links
          </motion.h2>
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-4"
          >
            {quickLinks.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                className="hover-lift"
                asChild
              >
                <a href={link.href} className="flex items-center gap-2">
                  {link.icon}
                  {link.name}
                </a>
              </Button>
            ))}
          </motion.div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="mt-16 text-center"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp}>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Still need help?</CardTitle>
                <CardDescription>
                  Can't find what you're looking for? Our team is here to help!
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="hover-lift" asChild>
                  <a href="https://support.soncresity.industries" target="_blank" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Contact Us
                  </a>
                </Button>
                <Button variant="outline" className="hover-lift" asChild>
                  <a href="/wiki" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Browse Wiki
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
