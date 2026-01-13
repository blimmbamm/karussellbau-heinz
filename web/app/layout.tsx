import type { Metadata } from "next";
import { client } from "../src/sanity/client";
import { metadataQuery, navigationQuery } from "../src/sanity/queries";
import {
  MetadataQueryResult,
  NavigationQueryResult,
} from "../src/sanity/types";
import Footer from "../components/footer/Footer";
import DesktopNav from "../components/navigation/desktop/DesktopNav";
import MobileNav from "../components/navigation/mobile/MobileNav";
import { greatVibesFont, nunitoFont } from "../styles/font";

import "./globals.css";
import styles from "./layout.module.css";
import { SITE_URL } from "../src/environment";

export const dynamic = "error";
export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await client.fetch<MetadataQueryResult>(
    metadataQuery,
    {},
    { cache: "force-cache" }
  );

  return {
    title: metadata?.title,
    description: metadata?.description,
    alternates: {
      canonical: SITE_URL,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigationQueryResult = await client.fetch<NavigationQueryResult>(
    navigationQuery,
    {},
    { cache: "force-cache" }
  );

  return (
    <html lang="de" data-scroll-behavior="smooth">
      <body
        className={`${greatVibesFont.variable} ${nunitoFont.className} ${styles.body}`}
      >
        <div className={styles.background} />
        <header className={styles.header}>
          <nav className={styles.navbar}>
            <DesktopNav navQueryResult={navigationQueryResult} />
            <MobileNav navQueryResult={navigationQueryResult} />
          </nav>
        </header>
        <div className={styles.border} />
        <main className={styles.main}>
          <div className={styles["page-content"]}>{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
