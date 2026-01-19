import Link from "next/link";
import styles from "./Footer.module.css";

type Props = { lang: string };

export default function Footer({ lang }: Props) {
  return (
    <footer className={styles.footer}>
      <span>&copy; 2026 - Karussellbau Heinz</span>
      <span className={styles["horizontal-divider"]}>|</span>
      <Link className={styles.link} href={`/${lang}/contact`}>
        {lang === "de" ? "Impressum und Kontakt" : "Legal notice and contact"}
      </Link>
    </footer>
  );
}
