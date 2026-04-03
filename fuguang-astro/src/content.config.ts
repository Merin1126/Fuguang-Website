import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        tag: z.string().optional(),
        date: z.union([z.string(), z.date()]).optional(),
        mainHeading: z.string().optional(),
    }),
});

export const collections = {
    blog: blogCollection,
};
