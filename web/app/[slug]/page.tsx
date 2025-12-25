import { notFound } from "next/navigation";
import { client } from "../../src/sanity/client";
import { pageBySlugQuery, slugsQuery } from "../../src/sanity/queries";
import {
  ColumnText,
  ImageGallery as ImageGalleryType,
  PageBySlugQueryResult,
  SlugsQueryResult,
} from "../../src/sanity/types";
import { PortableText, PortableTextTypeComponentProps } from "next-sanity";
import ImageGallery from "../../components/ImageGallery";

type PageContent = NonNullable<
  NonNullable<PageBySlugQueryResult["page"]>["content"]
>[number];

type ImageGalleryBlock = Extract<PageContent, { _type: "imageGallery" }>;

export const dynamic = "error";
export const revalidate = false;

export async function generateStaticParams() {
  const pages = await client.fetch<SlugsQueryResult>(slugsQuery);
  return pages.map((p) => ({ slug: p.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pageData = await client.fetch<PageBySlugQueryResult>(pageBySlugQuery, {
    slug,
  });

  if (!pageData) {
    notFound();
  }

  let previous = null;
  let next = null;

  const dropdownItems = pageData.page?.navContext?.dropdown?.items;
  if (dropdownItems) {
    const currentItemIndex = dropdownItems.findIndex(
      (item) => item.page?._ref === pageData.page?._id
    );

    previous = dropdownItems[currentItemIndex - 1] ?? null;
    next = dropdownItems[currentItemIndex + 1] ?? null;
  }

  console.log(dropdownItems);

  const tableOfContents = pageData.page?.content
    ?.filter((b) => b._type === "block")
    .flatMap((block) =>
      block.children?.flatMap(
        (child) =>
          child.marks?.map((mark: string) => {
            const def = block.markDefs?.find(
              (d) => d._key === mark && d._type === "anchor"
            );
            if (!def?.slug?.current) return null;

            return {
              label: block?.children?.map((c: any) => c.text).join(""),
              href: `#${def.slug.current}`,
            };
          }) ?? []
      )
    )
    .filter(Boolean);

  console.log(tableOfContents);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {previous?.label && (
          <a href={previous?.slug ?? ""}>← {previous?.label}</a>
        )}
        <div style={{ flex: 1 }} />
        {next?.label && <a href={next?.slug ?? ""}>{next?.label} →</a>}
      </div>
      {/* <p>{pageData.page?.title}</p> */}
      <p>Content:</p>
      {tableOfContents?.map((tocItem) => (
        <div key={tocItem?.href}>
          <a href={tocItem?.href}>{tocItem?.label}</a>
        </div>
      ))}
      <hr />
      {pageData.page?.content && (
        <PortableText
          value={pageData.page?.content}
          components={{
            marks: {
              anchor: ({ value, children }) => (
                <span id={value.slug?.current}>{children}</span>
              ),
            },
            block: {
              h1: ({ children }) => (
                <div
                  style={{
                    backgroundColor: "green",
                    fontSize: 48,
                    textAlign: "center",
                    padding: 20,
                  }}
                >
                  {children}
                </div>
              ),
            },
            types: {
              columnText: ({
                value,
              }: PortableTextTypeComponentProps<ColumnText>) => (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>{value.col1 && <PortableText value={value.col1} />}</div>
                  <div>{value.col2 && <PortableText value={value.col2} />}</div>
                </div>
              ),
              imageGallery: (
                props: PortableTextTypeComponentProps<ImageGalleryBlock>
              ) =>
                props.value.images && (
                  <ImageGallery images={props.value.images} />
                ),
            },
          }}
        />
      )}
    </div>
  );
}
