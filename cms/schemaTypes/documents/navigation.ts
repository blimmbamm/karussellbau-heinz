import {defineField, defineType} from 'sanity'

export const navigationType = defineType({
  name: 'navigation',
  title: 'Main Navigation',
  type: 'document',
  preview: {prepare: () => ({title: 'Navigation items'})},
  fields: [
    defineField({
      name: 'items',
      title: 'Navigation items',
      type: 'array',
      of: [{type: 'navLink'}, {type: 'navDropdown'}],
    }),
  ],
})
