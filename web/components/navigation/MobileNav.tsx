import { Menu } from "lucide-react";
import styles from "./MobileNav.module.css";
import { NavigationQueryResult } from "../../src/sanity/types";

type Props = {
  navQueryResult: NavigationQueryResult;
};

export default function MobileNav({}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <h1>Karussellbau Heinz</h1>
        <Menu />
      </div>
      <div>Drawer content</div>
    </div>
  );
}
