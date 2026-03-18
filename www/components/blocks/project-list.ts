import {LINKS} from "@/components/blocks/links";

export const projects = [

  // Available Categories:
  // "All"
  // "Mod"
  // "Modpack"
  // "Plugin"
  // "Datapack"
  // "Resourcepack"
  // "Tool"
  // "Other"

  {
    id: 1,
    title: "Refined Obsidian",
    description: "A Minecraft Mod by Soncresity Industries that adds various obsidian-themed items, blocks and armor trims.",
    wikiid: "siro",
    image: "/projects/siro/logo.png?height=300&width=500",
    category: "Mod",
    partner: false,
    tags: ["Minecraft", "Building", "Armor Trims"],
    //downloads: "",
    links: {
      github: LINKS.ro_gh_rep,
      modrinth: LINKS.ro_mr_proj,
      curseforge: LINKS.ro_cf_proj,
    }
  },
  {
    id: 2,
    title: "SI: Death Bolt",
    description: "A Minecraft Mod by Soncresity Industries that spawns configurable Lightning Bolts upon a player's death.",
    wikiid: "sidb",
    image: "/projects/si_death_bolt.png?height=300&width=500",
    category: "Mod",
    partner: false,
    tags: ["Minecraft", "Customisation", "Multiplayer"],
    //downloads: "",
    links: {
      github: LINKS.db_gh_rep,
      modrinth: LINKS.db_mr_proj,
      curseforge: LINKS.db_cf_proj,
    }
  },
  {
    id: 3,
    title: "TBS Main Menu Override",
    description: "A Resource Pack that removes the custom Main Menu background from The Broken Script",
    wikiid: "",
    image: "/projects/height_datapack_generator.png?height=300&width=500",
    category: "Resourcepack",
    partner: false,
    tags: ["Minecraft", "Archived", "Customisation", "The Broken Script"],
    //downloads: "",
    links: {
      github: "",
      modrinth: LINKS.tbsmmo_mr_proj,
      curseforge: LINKS.tbsmmo_cf_proj,
    }
  },
  {
    id: 10,
    title: "Height Datapack Generator",
    description: "A Tool by Soncresity Industries that generates a custom Minecraft Datapack to modify the world height and depth.",
    wikiid: "",
    image: "/projects/height_datapack_generator.png?height=300&width=500",
    category: "Tool",
    partner: false,
    tags: ["Minecraft", "Customization", "Generator", "World Generation"],
    //downloads: "",
    links: {
      github: "",
      modrinth: "",
      curseforge: "",
    }
  }
]
