import { defineCollection, z } from 'astro:content';

const postCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        date: z.date(),
        tags: z.array(z.string()).optional(),
        using: z.string().optional(),
        date_shift: z.number().optional(),
        public: z.boolean().optional(),
        layout: z.string().optional(),
        meta: z.array(z.string()).optional(),
    })
});

export const collections = {
    'post': postCollection,
};
