import Image from "next/image";
import { client } from "../src/sanity/client";
import { HomepageQueryResult } from "../src/sanity/types";
import { homepageQuery } from "../src/sanity/queries";

export const dynamic = "error";
export const revalidate = false;

export default async function Home() {
  const pageData = await client.fetch<HomepageQueryResult>(homepageQuery);

  return (
    <div style={{ height: "1000px" }}>
      <p>{pageData?.title}</p>
    </div>
  );
}
