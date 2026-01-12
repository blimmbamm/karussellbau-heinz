import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.root}>
      <h2>Diese Seite existiert nicht.</h2>
      <Link className={styles.link} href="/">
        Zurück zur Startseite.
      </Link>
    </div>
  );
}
