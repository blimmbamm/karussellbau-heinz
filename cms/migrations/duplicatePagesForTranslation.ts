import {defineMigration, create} from 'sanity/migrate'

export default defineMigration({
  title: 'Duplicate pages for English translation',
  documentTypes: ['page'],
  async *migrate(documents) {
    for await (const doc of documents()) {
      if (doc._type !== 'page') continue
      if (doc.language === 'en') continue // skip already translated

      const newDoc = {
        ...doc,
        _id: doc._id + '-en',
        language: 'en',
        title: `[EN] ${doc.title}`,
        // optional: clear slug if it must be unique
        // slug: {current: undefined},
      }

      yield create(newDoc)
    }
  },
})
