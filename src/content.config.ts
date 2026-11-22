import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(1),
    summary: z.string().min(1),
    category: z.enum(['Beastie Studio', 'Múltiplo', 'Boxio', 'Diseño']),
    heroImage: z.string().startsWith('/').optional(),
    publishedAt: z.coerce.date().optional(),
  }),
});

export const collections = { news };
