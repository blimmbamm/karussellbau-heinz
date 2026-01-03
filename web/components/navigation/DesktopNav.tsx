import { NavigationQueryResult } from "../../src/sanity/types";
import styles from "./DesktopNav.module.css";

type Props = {
  navQueryResult: NavigationQueryResult;
};

export default function DesktopNav({ navQueryResult }: Props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Karussellbau Heinz</h1>
      <div className={styles.navbar}>
        {navQueryResult?.items?.map((item) => (
          <div key={item._key}>{item.label}</div>
        ))}
      </div>
    </div>
  );
}
