"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Download,
  FileText,
  Flame,
  Menu,
  Package,
  Pickaxe,
  Scissors,
} from "lucide-react"
import Footer from "@/components/blocks/footer"
import {useTheme} from "next-themes"
import {useEffect, useState} from "react"
import {LINKS} from "@/components/blocks/links"
import {recipes} from "@/app/wiki/refined-obsidian/ro-recipes"
import {Button} from "@/components/ui/button"
import {Separator} from "@/components/ui/separator"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {trimsPage1, trimsPage2, trimsPage3, trimsPage4} from "@/app/wiki/refined-obsidian/ro-trims-pages"
import {PageWrapper} from "@/components/page-wrapper"
import {
  blocksPage1,
  blocksPage2,
  blocksPage3,
  blocksPage4,
  blocksPage5
} from "@/app/wiki/refined-obsidian/ro-blocks-pages"

export default function ROWiki() {

  const {theme} = useTheme()
  const [mounted, setMounted] = useState(false)
  const [recipeIndex, setRecipeIndex] = useState(0)
  const [recipeType, setRecipeType] = useState("crafting")

  // Filter recipes by type
  const filteredRecipes = recipes.filter((recipe) => recipe.type === recipeType)
  const currentRecipeIndex = recipeIndex % filteredRecipes.length

  const nextRecipe = () => {
    setRecipeIndex((prevIndex) => (prevIndex + 1) % filteredRecipes.length)
  }

  const prevRecipe = () => {
    setRecipeIndex((prevIndex) => (prevIndex - 1 + filteredRecipes.length) % filteredRecipes.length)
  }

  const blockPages = [blocksPage1, blocksPage2, blocksPage3, blocksPage4, blocksPage5];

  const [blockIndex, setBlockIndex] = useState(0);

  const prevBlockPage = () => {
    setBlockIndex((prevIndex) => (prevIndex - 1 + 5) % 5);
  }

  const nextBlockPage = () => {
    setBlockIndex((prevIndex) => (prevIndex + 1) % 5);
  }

  const trimsPages = [trimsPage1, trimsPage2, trimsPage3, trimsPage4];

  const [trimsIndex, setTrimsIndex] = useState(0);

  const prevTrimsPage = () => {
    setTrimsIndex((prevIndex) => (prevIndex - 1 + 4) % 4);
  }

  const nextTrimsPage = () => {
    setTrimsIndex((prevIndex) => (prevIndex + 1) % 4);
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setRecipeIndex(0)
  }, [recipeType])

  return (
    <PageWrapper backgroundInterval={30000}>
      <div className="min-h-screen theme-transition">
        {/* Header */}
        <header
          className="sticky top-0 z-50 w-full content-backdrop rounded-b-2xl theme-transition">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/refined-obsidian/ro-icon.png"
                alt="Refined Obsidian Icon"
                width={24}
                height={24}
                className="animate-pulse-glow"
              />
              <span className="text-xl font-serephixBold text-primary">Refined Obsidian</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/wiki/refined-obsidian" className="text-sm font-medium hover-lift relative group">
                Wiki
                <span
                  className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-100 transition-transform"></span>
              </Link>
              <Link href="/downloads/refined-obsidian" className="text-sm font-medium hover-lift relative group">
                Downloads
                <span
                  className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </Link>
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <Button variant="ghost" size="icon" className="transition-colors">
                <Menu className="h-5 w-5"/>
              </Button>
            </div>
          </div>
        </header>

        <div
          className="container py-8 md:grid md:grid-cols-[240px_1fr] md:gap-10 lg:grid-cols-[280px_1fr] lg:gap-10">
          {/* Sidebar */}
          <aside className="hidden md:block">
            <div className="sticky top-20 overflow-y-auto pb-12">
              <div className="space-y-4">
                <div className="py-2">
                  <h2 className="mb-2 text-lg font-semibold tracking-tight text-primary">Navigation</h2>
                  <div className="space-y-1">
                    <Link href="#overview" className="w-full">
                      <Button variant="ghost" size="sm"
                              className="w-full justify-start gap-2 hover-lift group">
                        <FileText className="h-4 w-4 transition-transform group-hover:scale-110"/>
                        <span>Overview</span>
                      </Button>
                    </Link>
                    <Link href="#features" className="w-full">
                      <Button variant="ghost" size="sm"
                              className="w-full justify-start gap-2 hover-lift group">
                        <FileText className="h-4 w-4 transition-transform group-hover:scale-110"/>
                        <span>Features</span>
                      </Button>
                    </Link>
                    <Link href="#crafting" className="w-full">
                      <Button variant="ghost" size="sm"
                              className="w-full justify-start gap-2 hover-lift group">
                        <Pickaxe className="h-4 w-4 transition-transform group-hover:scale-110"/>
                        <span>Crafting</span>
                      </Button>
                    </Link>
                    <Link href="#compatibility" className="w-full">
                      <Button variant="ghost" size="sm"
                              className="w-full justify-start gap-2 hover-lift group">
                        <Package className="h-4 w-4 transition-transform group-hover:scale-110"/>
                        <span>Compatibility</span>
                      </Button>
                    </Link>
                    <Link href="#installation" className="w-full">
                      <Button variant="ghost" size="sm"
                              className="w-full justify-start gap-2 hover-lift group">
                        <Download className="h-4 w-4 transition-transform group-hover:scale-110"/>
                        <span>Download</span>
                      </Button>
                    </Link>
                  </div>
                </div>
                <Separator className="bg-border/50"/>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="space-y-10 content-backdrop rounded-2xl p-6">
            {/* Hero Section */}
            <div
              id="overview"
              className="relative overflow-hidden rounded-xl glass-card theme-transition"
            >
              <div className="relative p-6 md:p-8 lg:p-10">
                <div className="flex flex-col items-center text-center">
                  <Image
                    src="/projects/siro/logo.png"
                    alt="Refined-Obsidian Icon"
                    width={96}
                    height={96}
                    className="mb-4 animate-pulse-glow"
                  />
                  <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-primary">
                    Refined Obsidian Wiki
                  </h1>
                  <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
                    A Minecraft Mod by Soncresity Industries that adds various obsidian-themed items,
                    blocks and armor trims.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <Link href="/downloads/refined-obsidian">
                      <Button
                        className="bg-primary hover:bg-primary/80 text-primary-foreground transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg hover:shadow-primary/20">
                        Download Mod
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <section id="features" className="space-y-6">
              <h2 className="text-2xl font-serephixBold tracking-tight text-primary">Key Features</h2>
              <Tabs defaultValue="items" className="w-full">
                <TabsList className="bg-background border border-border/50 p-1 theme-transition">
                  <TabsTrigger
                    value="items"
                    className="transition-all data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                  >
                    Items
                  </TabsTrigger>
                  <TabsTrigger
                    value="blocks"
                    className="transition-all data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                  >
                    Blocks
                  </TabsTrigger>
                  <TabsTrigger
                    value="trims"
                    className="transition-all data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                  >
                    Armor Trims
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="items"
                  className="mt-6 space-y-6 animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="flex gap-4 group hover-lift">
                      <div
                        className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border/50 bg-card theme-transition group-hover:border-primary/50">
                        <Image
                          src="/assets/refined-obsidian/items/obsidian_dust.png"
                          alt="Obsidian Dust"
                          width={64}
                          height={64}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-primary">Obsidian Dust</h3>
                        <p className="text-sm text-muted-foreground">
                          A powder that can be crafted from Cutting Obsidian and used for Armor
                          Trims and Cobbled Obsidian.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value="blocks"
                  className="mt-6 space-y-6 animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Button className="h-10 w-10" variant="ghost" size="icon" onClick={prevBlockPage}>
                      <ArrowLeft className="h-5 w-5 text-primary" />
                    </Button>
                    <span className="text-sm text-muted-foreground">Page {blockIndex + 1} of {blockPages.length}</span>
                    <Button className="h-10 w-10" variant="ghost" size="icon" onClick={nextBlockPage}>
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">All Blocks are Blast resistant and can only
                    be mined with
                    at least a Diamond Pickaxe.</p>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {blockPages[blockIndex]()}
                  </div>
                </TabsContent>
                <TabsContent
                  value="trims"
                  className="mt-6 space-y-6 animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Button className="h-10 w-10" variant="ghost" size="icon" onClick={prevTrimsPage}>
                      <ArrowLeft className="h-5 w-5 text-primary" />
                    </Button>
                    <span className="text-sm text-muted-foreground">Page {trimsIndex + 1} of {trimsPages.length}</span>
                    <Button className="h-10 w-10" variant="ghost" size="icon" onClick={nextTrimsPage}>
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Obsidian Dust can be used to trim any Armor with any Trim Pattern.</p>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {trimsPages[trimsIndex]()}
                  </div>
                </TabsContent>
              </Tabs>
            </section>

            {/* Crafting */}
            <section id="crafting" className="space-y-6">
              <h2 className="text-2xl font-serephixBold tracking-tight text-primary">Recipe Guide</h2>
              <div className="mb-4">
                <Tabs defaultValue="crafting" className="w-full" onValueChange={setRecipeType}>
                  <TabsList className="bg-background border border-border/50 p-1 theme-transition">
                    <TabsTrigger
                      value="crafting"
                      className="transition-all data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      <div className="w-6 h-6 mr-2">
                        <img src="/assets/refined-obsidian/crafting.png" alt="Crafting Table" className="w-full h-full object-contain" />
                      </div>
                      Crafting Table
                    </TabsTrigger>
                    <TabsTrigger
                      value="stonecutting"
                      className="transition-all data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      <div className="w-6 h-6 mr-2">
                        <img src="/assets/refined-obsidian/stonecutting.png" alt="Stonecutter" className="w-full h-full object-contain" />
                      </div>
                      Stone Cutter
                    </TabsTrigger>
                    <TabsTrigger
                      value="smelting"
                      className="transition-all data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      <div className="w-6 h-6 mr-2">
                        <img src="/assets/refined-obsidian/smelting.png" alt="Furnace" className="w-full h-full object-contain" />
                      </div>
                      Smelting
                    </TabsTrigger>
                    <TabsTrigger
                      value="blasting"
                      className="transition-all data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      <div className="w-6 h-6 mr-2">
                        <img src="/assets/refined-obsidian/blasting.png" alt="Blast Furnace" className="w-full h-full object-contain" />
                      </div>
                      Blasting
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="rounded-lg glass-card p-6 hover-glow theme-transition">
                <div className="flex items-center justify-between mb-4">
                  <Button variant="ghost" size="icon" onClick={prevRecipe}>
                    <ArrowLeft className="h-5 w-5 text-primary"/>
                    <span className="sr-only">Previous recipe</span>
                  </Button>
                  <h3 className="text-xl font-semibold text-primary">{filteredRecipes[currentRecipeIndex].name}</h3>
                  <Button variant="ghost" size="icon" onClick={nextRecipe}>
                    <ArrowRight className="h-5 w-5 text-primary"/>
                    <span className="sr-only">Next recipe</span>
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2">
                  <div className="flex justify-center">
                    {recipeType === "crafting" && (
                      <div className="grid grid-cols-3 gap-1 rounded-lg border border-border/50 bg-background p-2 theme-transition max-w-[250px] max-h-[250px]">
                        {Array.from({length: 9}).map((_, index) => {
                          const ingredient = filteredRecipes[currentRecipeIndex].ingredients.find(
                            (i) => i.position === index,
                          )
                          return (
                            <div
                              key={index}
                              className="aspect-square rounded border border-border/50 bg-card/80 p-1 transition-all duration-300 hover:border-primary/50 hover:bg-card theme-transition"
                            >
                              {ingredient && (
                                <div className="flex items-center justify-center">
                                  <img
                                    src={`/assets/refined-obsidian/items/${ingredient.name.toLowerCase().replace(/\s+/g, "_")}.png`}
                                    alt={ingredient.name}
                                    className="max-w-full max-h-full object-contain"
                                  />
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                    {recipeType === "stonecutting" && (
                      <div className="rounded-lg border border-border/50 bg-background p-4 theme-transition max-w-[250px]">
                        <div className="flex items-center gap-4">
                          <div className="aspect-square w-12 rounded border border-border/50 bg-card/80 p-1">
                            <div className="flex items-center justify-center">
                              <img
                                src={`/assets/refined-obsidian/items/${filteredRecipes[currentRecipeIndex].ingredients[0].name.toLowerCase().replace(/\s+/g, "_")}.png`}
                                alt={filteredRecipes[currentRecipeIndex].ingredients[0].name}
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                          </div>
                          <div className="flex-1 text-center">
                            <Scissors className="h-6 w-6 text-primary mx-auto"/>
                            <p className="text-xs text-muted-foreground mt-1">Stonecutter</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {recipeType === "smelting" && (
                      <div className="rounded-lg border border-border/50 bg-background p-4 theme-transition max-w-[250px]">
                        <div className="flex flex-col items-center gap-2">
                          <div className="aspect-square w-12 rounded border border-border/50 bg-card/80 p-1">
                            <div className="flex items-center justify-center">
                              <img
                                src={`/assets/refined-obsidian/items/${filteredRecipes[currentRecipeIndex].ingredients[0].name.toLowerCase().replace(/\s+/g, "_")}.png`}
                                alt={filteredRecipes[currentRecipeIndex].ingredients[0].name}
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                          </div>
                          <Flame className="h-12 w-12 text-primary animate-pulse"/>
                          <p className="text-xs text-muted-foreground">Furnace</p>
                        </div>
                      </div>
                    )}
                    {recipeType === "blasting" && (
                      <div className="rounded-lg border border-border/50 bg-background p-4 theme-transition max-w-[250px]">
                        <div className="flex flex-col items-center gap-2">
                          <div className="aspect-square w-12 rounded border border-border/50 bg-card/80 p-1">
                            <div className="flex items-center justify-center">
                              <img
                                src={`/assets/refined-obsidian/items/${filteredRecipes[currentRecipeIndex].ingredients[0].name.toLowerCase().replace(/\s+/g, "_")}.png`}
                                alt={filteredRecipes[currentRecipeIndex].ingredients[0].name}
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                          </div>
                          <Flame className="h-12 w-12 text-primary animate-pulse"/>
                          <p className="text-xs text-muted-foreground">Blast Furnace</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex flex-col md:flex-row items-center">
                      <ChevronRight className="h-8 w-8 md:h-12 md:w-12 text-primary animate-pulse mb-2 md:mb-0" />
                      <div className="relative">
                        <div className="rounded border border-border/50 bg-card/80 p-2 transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-md hover:shadow-primary/20 theme-transition aspect-square w-[100px] md:w-[120px]">
                          <div className="flex items-center justify-center">
                            <img
                              src={`/assets/refined-obsidian/items/${filteredRecipes[currentRecipeIndex].result.name.toLowerCase().replace(/\s+/g, "_")}.png`}
                              alt={filteredRecipes[currentRecipeIndex].result.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        </div>
                        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-lg font-medium text-primary">
                          {filteredRecipes[currentRecipeIndex].result.count > 1
                            ? `x${filteredRecipes[currentRecipeIndex].result.count}`
                            : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <p className="text-xs text-muted-foreground">
                    Recipe {currentRecipeIndex + 1} of {filteredRecipes.length}
                  </p>
                </div>
              </div>
            </section>

            {/* Gallery */}
            <section id="gallery" className="space-y-6">
              <h2 className="text-2xl font-serephixBold tracking-tight text-primary">Gallery</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div
                  className="overflow-hidden rounded-lg border border-border/50 group hover-glow theme-transition">
                  <Image
                    src="/assets/refined-obsidian/gallery-1.jpg"
                    alt="Refined Obsidian Overview"
                    width={500}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div
                  className="overflow-hidden rounded-lg border border-border/50 group hover-glow theme-transition">
                  <Image
                    src="/assets/refined-obsidian/gallery-2.jpg"
                    alt="Block Palette"
                    width={500}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div
                  className="overflow-hidden rounded-lg border border-border/50 group hover-glow theme-transition">
                  <Image
                    src="/assets/refined-obsidian/gallery-3.jpg"
                    alt="Building"
                    width={500}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            </section>

            {/* Download */}
            <section id="installation" className="space-y-6">
              <h2 className="text-2xl font-serephixBold tracking-tight text-primary">Download</h2>
              <div className="rounded-lg glass-card p-6 hover-glow theme-transition">
                <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-serephixBold text-primary">Get Refined Obsidian</h3>
                    <p className="text-muted-foreground">
                      Download the latest version of Refined Obsidian for your Minecraft version.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Link href="/downloads/refined-obsidian">
                      <Button
                        variant="outline"
                        className="border-primary text-primary transition-all duration-300 hover:scale-105"
                      >
                        All Versions
                      </Button>
                    </Link>
                  </div>
                </div>
                <Separator className="my-6 bg-border/50"/>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h4 className="font-medium text-primary">Requirements</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Minecraft 1.20.1 or newer</li>
                      <li>• Fabric, Forge, or NeoForge</li>
                      <li>• Java 17 or newer</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-primary">Installation</h4>
                    <p className="text-sm text-muted-foreground">
                      Place the downloaded .jar file in your Minecraft mods folder or automatically
                      install it into an Instance with the{" "}
                      <a href="https://modrinth.com/app" className="text-primary hover:underline">
                        Modrinth
                      </a>{" "}
                      or{" "}
                      <a href="https://www.curseforge.com/download/app"
                         className="text-primary hover:underline">
                        CurseForge
                      </a>{" "}
                      App.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-primary">Download Options</h4>
                    <div className="flex flex-col gap-2">
                      <a
                        href={LINKS.ro_mr_proj}
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        <Image src="/icons/modrinth.png" alt="Modrinth" width={16} height={16}/>
                        Modrinth
                      </a>
                      <a
                        href={LINKS.ro_cf_proj}
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        <Image src="/icons/curseforge.png\" alt="CurseForge" width={16} height={16}
                               className="invert-on-dark"/>
                        CurseForge
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>

        {/* Footer */}
        <Footer/>
      </div>
    </PageWrapper>
  )
}
