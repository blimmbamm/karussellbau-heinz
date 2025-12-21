import { notFound } from "next/navigation";
import { client } from "../../src/sanity/client";
import { pageBySlugQuery, slugsQuery } from "../../src/sanity/queries";
import {
  PageBySlugQueryResult,
  SlugsQueryResult,
} from "../../src/sanity/types";

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

  return <div>{pageData.title}</div>;
}
