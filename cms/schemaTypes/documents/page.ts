import {defineArrayMember, defineField, defineType} from 'sanity'

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
      validation: (rule) =>
        rule.custom(async (value, context) => {
          if (!value) return true

          const {getClient} = context
          const client = getClient({apiVersion: '2024-01-01'})

          const existingHome = await client.fetch(
            `count(*[_type == "page" && isHome == true && _id != $id])`,
            {id: context.document?._id},
          )

          return existingHome > 0 ? 'There can only be one homepage' : true
        }),
    }),

    defineField({
      name: 'content',
      type: 'blockContent',
    }),
  ],
})
