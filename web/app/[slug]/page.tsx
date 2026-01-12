import { notFound } from "next/navigation";
import { client } from "../../src/sanity/client";
import { pageBySlugQuery, slugsQuery } from "../../src/sanity/queries";
import {
  PageBySlugQueryResult,
  SlugsQueryResult,
} from "../../src/sanity/types";
import styles from "./page.module.css";
import PreviousNextNavigation from "../../components/navigation/sub-navigation/PreviousNextNavigation";
import TableOfContents from "../../components/navigation/sub-navigation/TableOfContents";
import PortableTextRenderer from "../../components/portable-text/renderer/PortableTextRenderer";

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

  if (!pageData.page) {
    notFound();
  }

  const { content } = pageData.page;

  return (
    <div>
      {pageData.page.showPrevNextNav && (
        <PreviousNextNavigation pageData={pageData} />
      )}

      <div className={styles.container}>
        {content && <PortableTextRenderer content={content} />}
        <TableOfContents pageData={pageData} />
      </div>
    </div>
  );
}
