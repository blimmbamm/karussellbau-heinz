import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>&copy; 2025 - Karussellbau Heinz</span>
      <span className={styles["horizontal-divider"]}>|</span>
      <Link className={styles.link} href={"/kontakt"}>
        Impressum und Kontakt
      </Link>
    </footer>
  );
}
