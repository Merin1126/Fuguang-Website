import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

const baseSchema = z.object({
    title: z.string(),
    tag: z.string().optional(),
    date: z.union([z.string(), z.date()]).optional(),
    mainHeading: z.string().optional(),
});

const blogCollection = defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
    schema: baseSchema,
});

const grammarCollection = defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/grammar' }),
    schema: baseSchema.extend({
        level: z.enum(['N1', 'N2', 'N3', 'N4', 'N5']).optional(),
    }),
});

const vocabularyCollection = defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/vocabulary' }),
    schema: baseSchema.extend({
        level: z.enum(['N1', 'N2', 'N3', 'N4', 'N5']).optional(),
    }),
});

const examsCollection = defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/exams' }),
    schema: baseSchema.extend({
        /** CATTI 频道（如 `exams/catti/translation/*`、`exams/catti/interpretation/*`）建议填写 */
        cattiBranch: z.enum(['translation', 'interpretation']).optional(),
    }),
});

const businessCollection = defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/business' }),
    schema: baseSchema,
});

export const collections = {
    blog: blogCollection,
    grammar: grammarCollection,
    vocabulary: vocabularyCollection,
    exams: examsCollection,
    business: businessCollection,
};
