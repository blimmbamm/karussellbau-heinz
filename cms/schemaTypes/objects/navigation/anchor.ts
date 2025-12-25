import { defineType } from 'sanity'

export const anchorAnnotation = defineType({
  name: 'anchor',
  title: 'Anchor',
  type: 'object',
  fields: [
    {
      name: 'slug',
      type: 'slug',
    },
  ],
})
