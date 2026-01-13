import { client } from "../src/sanity/client";
import { HomepageQueryResult } from "../src/sanity/types";
import { homepageQuery } from "../src/sanity/queries";
import styles from "./page.module.css";
import PortableTextRenderer from "../components/portable-text/renderer/PortableTextRenderer";

export const dynamic = "error";
export const revalidate = false;

export default async function Home() {
  const pageData = await client.fetch<HomepageQueryResult>(
    homepageQuery,
    {},
    { cache: "force-cache" }
  );

  if (!pageData) return null;

  return (
    <div className={styles.root}>
      {pageData.content && <PortableTextRenderer content={pageData.content} />}
    </div>
  );
}
