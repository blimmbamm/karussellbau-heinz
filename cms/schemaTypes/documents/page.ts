import {defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) =>
        rule.custom((slug, context) => {
          if (context.document?.isHome && slug?.current) {
            return 'Home page must not have a slug'
          }
          return true
        }),
    }),

    defineField({
      name: 'isHome',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'content',
      type: 'blockContent',
    }),
  ],
})
