import {defineArrayMember, defineType} from 'sanity'

export const blockContentType = defineType({
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading 1', value: 'h1'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
        {title: 'Heading 4', value: 'h4'},
        {title: 'Heading 5', value: 'h5'},
        {title: 'Heading 6', value: 'h6'},
        {title: 'Heading 1 centered', value: 'h1Centered'},
        {title: 'Centered', value: 'centered'},
      ],
      marks: {
        annotations: [
          {
            type: 'anchor',
            icon: () => '#',
          },
          {
            type: 'link',
            icon: () => 'L',
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
      type: 'imagesRef',
    }),
    defineArrayMember({
      type: 'table',
    }),
    defineArrayMember({
      type: 'videoRef',
    }),
    defineArrayMember({
      type: 'headlineWithDate',
    }),
  ],
})
