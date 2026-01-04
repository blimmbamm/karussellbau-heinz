"use client";

import { Menu, X } from "lucide-react";
import styles from "./MobileNav.module.css";
import { NavigationQueryResult } from "../../../src/sanity/types";
import { useState } from "react";
import MobileDrawer from "./MobileDrawer";
import Link from "next/link";

type Props = {
  navQueryResult: NavigationQueryResult;
};

export default function MobileNav({ navQueryResult }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleCloseDrawer() {
    setDrawerOpen(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Link
          href={"/"}
          className={styles.title}
          onNavigate={handleCloseDrawer}
        >
          Karussellbau Heinz
        </Link>
        <Menu size={36} onClick={() => setDrawerOpen(true)} />
      </div>
      <div className={`${styles.drawer} ${drawerOpen ? styles.open : ""} `}>
        <div className={styles.navbar}>
          <Link
            href={"/"}
            className={styles.title}
            onNavigate={handleCloseDrawer}
          >
            Karussellbau Heinz
          </Link>
          <X size={36} onClick={handleCloseDrawer} />
        </div>
        <div className={styles["drawer-content"]}>
          <MobileDrawer
            navQueryResult={navQueryResult}
            key={drawerOpen.toString()}
            onClose={handleCloseDrawer}
          />
        </div>
      </div>
    </div>
  );
}
