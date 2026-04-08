import JSZip from "jszip";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { version, packFormat } = req.query;

    const dims = [
        { name: "overworld", h: [req.query.h1_min, req.query.h1_max], effects: "minecraft:overworld", infiniburn: "#minecraft:infiniburn_overworld" },
        { name: "overworld_caves", h: [req.query.h2_min, req.query.h2_max], effects: "minecraft:overworld", infiniburn: "#minecraft:infiniburn_overworld" },
        { name: "the_nether", h: [req.query.h3_min, req.query.h3_max], effects: "minecraft:the_nether", infiniburn: "#minecraft:infiniburn_nether" },
        { name: "the_end", h: [req.query.h4_min, req.query.h4_max], effects: "minecraft:the_end", infiniburn: "#minecraft:infiniburn_end" },
    ];

    const zip = new JSZip();

    zip.file("pack.mcmeta", JSON.stringify({
        pack: { pack_format: Number(packFormat), description: "Generated Datapack" }
    }, null, 2));

    // fetch pack.png from public folder
    const imageRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/downloads/current/height_datapack_generator/pack.png`);
    const imgBuffer = Buffer.from(await imageRes.arrayBuffer());
    zip.file("pack.png", imgBuffer);

    const folder = zip.folder("data/minecraft/dimension_type");
    if (!folder) return res.status(500).send("Failed to create folder");

    dims.forEach(d => {
        const minY = Number(d.h[0]);
        const maxY = Number(d.h[1]);
        const logicalHeight = Math.abs(minY) + maxY + 1;

        folder.file(`${d.name}.json`, JSON.stringify({
            ambient_light: 0.0,
            bed_works: true,
            coordinate_scale: 1.0,
            effects: d.effects,
            has_ceiling: false,
            has_raids: true,
            has_skylight: true,
            height: logicalHeight,
            infiniburn: d.infiniburn,
            logical_height: logicalHeight,
            min_y: minY,
            monster_spawn_block_light_limit: 0,
            monster_spawn_light_level: { type: "minecraft:uniform", max_inclusive: 7, min_inclusive: 0 },
            natural: true,
            piglin_safe: false,
            respawn_anchor_works: false,
            ultrawarm: false
        }, null, 2));
    });

    const content = await zip.generateAsync({ type: "nodebuffer" });
    res.setHeader("Content-Disposition", `attachment; filename=si-heights-dp-${version}.zip`);
    res.setHeader("Content-Type", "application/zip");
    res.status(200).send(content);
}