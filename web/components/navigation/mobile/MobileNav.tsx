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
    <div className={styles.root}>
      <div className={styles.menu}>
        <div className={styles["title-container"]}>
          <Link
            href={"/"}
            className={styles.title}
            onNavigate={handleCloseDrawer}
          >
            Karussellbau Heinz
          </Link>
        </div>
        {drawerOpen ? (
          <X
            className={styles["menu-toggle"]}
            strokeWidth={3}
            onClick={handleCloseDrawer}
          />
        ) : (
          <Menu
            className={styles["menu-toggle"]}
            strokeWidth={3}
            onClick={() => setDrawerOpen(true)}
          />
        )}
      </div>
      <MobileDrawer
        open={drawerOpen}
        navQueryResult={navQueryResult}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}
