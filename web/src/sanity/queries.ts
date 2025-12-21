import { groq } from "next-sanity";

export const slugsQuery = groq`
  *[
    _type == "page" &&
    defined(slug.current) &&
    isHome != true
  ]{
    "slug": slug.current
  }
`;

export const homepageQuery = groq`
  *[_type == "page" && isHome == true][0]{
    _id,
    title,
    content
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug && isHome != true][0]{
    _id,
    title,
    "slug": slug.current,
    content
  }
`;

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
`;
