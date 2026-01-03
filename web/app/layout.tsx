import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";
import { client } from "../src/sanity/client";
import { navigationQuery } from "../src/sanity/queries";
import { NavigationQueryResult } from "../src/sanity/types";
import DesktopNav from "../components/navigation/DesktopNav";
import MobileNav from "../components/navigation/MobileNav";
import Footer from "../components/footer/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

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
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
