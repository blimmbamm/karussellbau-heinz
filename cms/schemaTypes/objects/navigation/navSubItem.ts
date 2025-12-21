import {defineField, defineType} from 'sanity'

export const navSubItemType = defineType({
  name: 'navSubItem',
  title: 'Navigation Sub Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'page',
      type: 'reference',
      to: [{type: 'page'}],
      validation: (rule) => rule.required(),
    }),
  ],
})
