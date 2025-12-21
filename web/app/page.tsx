import Image from "next/image";
import { client } from "../src/sanity/client";
import { HomepageQueryResult } from "../src/sanity/types";
import { homepageQuery } from "../src/sanity/queries";

export const dynamic = "error";
export const revalidate = false;

export default async function Home() {
  const pageData = await client.fetch<HomepageQueryResult>(homepageQuery);

  return (
    <div>
      <main>
        <Image
          src="/img_20210802_190118.jpg"
          alt="Testbild"
          width={100}
          height={20}
          priority
        />
        <p>{pageData?.title}</p>
      </main>
    </div>
  );
}
