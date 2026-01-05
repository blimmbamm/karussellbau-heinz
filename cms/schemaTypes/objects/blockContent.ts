import {defineArrayMember, defineType} from 'sanity'

export const blockContentType = defineType({
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Page title', value: 'h1'},
        {title: 'Section title', value: 'h2'},
      ],
      marks: {
        annotations: [
          {
            type: 'anchor',
            icon: () => '#',
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'columnText',
    }),
    defineArrayMember({
      type: 'imageGallery',
    }),
    defineArrayMember({
      type: 'table',
    }),
  ],
})
