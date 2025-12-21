import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { client } from "../src/sanity/client";
import { navigationQuery } from "../src/sanity/queries";
import { NavigationQueryResult } from "../src/sanity/types";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const dynamic = 'error'
export const revalidate = false

export const metadata: Metadata = {
  title: "Karussellbau Heinz",
  description: "TODO",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigationItems =
    await client.fetch<NavigationQueryResult>(navigationQuery);

  return (
    <html lang="en">
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <nav>
            {navigationItems?.items?.map((item) => (
              <div key={item._key}>
                {item.label}: {item.type}
              </div>
            ))}
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
