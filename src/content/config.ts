import { defineCollection, z } from 'astro:content';

const legal = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    lastUpdated: z.string(),
  }),
});

export const collections = { legal };
