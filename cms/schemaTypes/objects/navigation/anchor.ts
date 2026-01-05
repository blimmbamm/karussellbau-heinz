import {defineType, defineField} from 'sanity'

export const anchorAnnotation = defineType({
  name: 'anchor',
  title: 'Anchor',
  type: 'object',
  fields: [
    defineField({
      name: 'slug',
      type: 'slug',
    }),
    defineField({
      name: 'label',
      type: 'string',
    }),
    defineField({
      name: 'hidden',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
