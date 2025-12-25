import {defineArrayMember, defineType} from 'sanity'

export const blockContentType = defineType({
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      // styles: [{title: 'Whatever', value: 'some value'}],
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
