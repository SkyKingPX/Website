import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

const cnfgLang = JSON.parse(
  fs.readFileSync(path.resolve('./lib/shiki/cnfg.tmLanguage.json'), 'utf8')
)

export const docs = defineDocs({
  dir: 'content',
  docs: {
    schema: frontmatterSchema.extend({
      curseforgeUrl: z.string().optional(),
      modrinthUrl: z.string().optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        dark: "github-dark",
        light: "github-light",
      },
      langs: [cnfgLang, 'java'],
      engine: "oniguruma",
    },
  },
});