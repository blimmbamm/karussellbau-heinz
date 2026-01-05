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
import styles from "./page.module.css";
import PreviousNextNavigation from "../../components/navigation/sub-navigation/PreviousNextNavigation";
import TableOfContents from "../../components/navigation/sub-navigation/TableOfContents";

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
    // TODO: I think this is not the correct check
    notFound();
  }

  return (
    <div className={styles.root}>
      <PreviousNextNavigation pageData={pageData} />

      <div className={styles.container}>
        <TableOfContents pageData={pageData} />
        <div>
          {pageData.page?.content && (
            <PortableText
              value={pageData.page?.content}
              components={{
                marks: {
                  anchor: ({ value, children }) => (
                    <span
                      id={value.slug?.current}
                      className={styles["anchor-target"]}
                    >
                      {!value.hidden && children}
                    </span>
                  ),
                },
                block: {
                  h1: ({ children }) => (
                    <div
                      style={{
                        // backgroundColor: "green",
                        fontSize: 48,
                        textAlign: "center",
                        // padding: 20,
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
                      <div>
                        {value.col1 && <PortableText value={value.col1} />}
                      </div>
                      <div>
                        {value.col2 && <PortableText value={value.col2} />}
                      </div>
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
      </div>
    </div>
  );
}
