import type { Metadata } from "next";
import { client } from "../src/sanity/client";
import { navigationQuery } from "../src/sanity/queries";
import { NavigationQueryResult } from "../src/sanity/types";
import Footer from "../components/footer/Footer";
import DesktopNav from "../components/navigation/desktop/DesktopNav";
import MobileNav from "../components/navigation/mobile/MobileNav";
import { greatVibesFont, nunitoFont } from "../styles/font";

import "./globals.css";
import styles from "./layout.module.css";

export const dynamic = "error";
export const revalidate = false;

export const metadata: Metadata = {
  title: "Karussellbau Heinz",
  description: "TODO",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigationQueryResult =
    await client.fetch<NavigationQueryResult>(navigationQuery);

  return (
    <html lang="en">
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
