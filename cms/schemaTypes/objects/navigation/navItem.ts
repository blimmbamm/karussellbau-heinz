import {defineField, defineType} from 'sanity'

export const navItemType = defineType({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  preview: {
    select: {
      label: 'label',
      type: 'type',
    },
    prepare({label, type}) {
      return {
        title: label || 'Untitled',
        subtitle: type === 'dropdown' ? 'Dropdown' : 'Link',
      }
    },
  },
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'type',
      title: 'Item type',
      type: 'string',
      options: {
        list: [
          {title: 'Link', value: 'link'},
          {title: 'Dropdown', value: 'dropdown'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [{type: 'page'}],
      hidden: ({parent}) => parent?.type !== 'link',
    }),

    defineField({
      name: 'items',
      title: 'Dropdown items',
      type: 'array',
      of: [{type: 'navSubItem'}],
      hidden: ({parent}) => parent?.type !== 'dropdown',
    }),
  ],
})
