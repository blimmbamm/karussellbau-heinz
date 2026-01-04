"use client";

import { useState } from "react";
import { NavigationQueryResult } from "../../../src/sanity/types";
import styles from "./DesktopNav.module.css";
import NavItem from "./NavItem";
import { NavDropdownItem } from "../../../src/types";
import NavMenu from "./NavMenu";
import Link from "next/link";

type Props = {
  navQueryResult: NavigationQueryResult;
};

export type NavDropdownState = {
  item: NavDropdownItem;
  anchorEl: HTMLDivElement | null;
} | null;

export default function DesktopNav({ navQueryResult }: Props) {
  const [selectedNavDropdown, setSelectedNavDropdown] =
    useState<NavDropdownState>(null);

  function handleSelectNavDropdown({
    item,
    anchorEl,
  }: NonNullable<NavDropdownState>) {
    setSelectedNavDropdown((prev) => {
      // if the clicked item is already open, close it
      if (prev?.item._key === item._key) {
        return null;
      }
      // otherwise, open it
      return { item, anchorEl };
    });
  }

  return (
    <div className={styles.container}>
      <Link href={"/"} className={styles.title}>
        Karussellbau Heinz
      </Link>
      <div className={styles.navbar}>
        {navQueryResult?.items?.map((item) => (
          <NavItem
            key={item._key}
            item={item}
            onClick={handleSelectNavDropdown}
          />
        ))}
        {selectedNavDropdown && (
          <NavMenu
            selectedNavDropdown={selectedNavDropdown}
            onClose={() => setSelectedNavDropdown(null)}
          />
        )}
      </div>
    </div>
  );
}
