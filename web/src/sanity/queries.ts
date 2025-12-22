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
  {
    "page": *[
      _type == "page" &&
      slug.current == $slug && 
      isHome != true
    ][0]{
      _id,
      title,
      content,
      "slug": slug.current,
      "navContext": *[_type == "navigation"][0]{
        "dropdown": items[
          _type == "navDropdown" && 
          (count(items[page._ref == ^.^.^._id]) > 0)
        ][0]
      }
    }
  }
`;

export const navigationQuery = groq`
  *[_type == "navigation"][0]{
    items[]{
      _type,
      _key,
      label,
      _type == "navLink" => {
        "slug": page->slug.current
      },
      _type == "navDropdown" => {
        items[]{
          label,
          "slug": page->slug.current
        }
      }
    }
  }
`;
