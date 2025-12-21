import { groq } from 'next-sanity'

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    content
  }
`

export const navigationQuery = groq`
  *[_type == "navigation"][0]{
    items[]{
      _key,
      label,
      type,
      page->{ title, "slug": slug.current },
      items[]{
        _key,
        label,
        page->{ title, "slug": slug.current }
      }
    }
  }
`
