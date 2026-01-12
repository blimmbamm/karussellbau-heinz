import {defineArrayMember, defineType} from 'sanity'
import PageTitle from '../../studio-components/PageTitle'

export const blockContentType = defineType({
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Page title', value: 'pageTitle', component: PageTitle},
        {title: 'Section title', value: 'sectionTitle'},
        {title: 'Heading 1', value: 'h1'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
        {title: 'Heading 4', value: 'h4'},
        {title: 'Heading 5', value: 'h5'},
        {title: 'Heading 6', value: 'h6'},
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
    defineArrayMember({
      type: 'video',
    }),
    defineArrayMember({
      type: 'headlineWithDate',
    }),
  ],
})
