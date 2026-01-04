"use client";

import Link from "next/link";
import { useRef } from "react";
import { NavItemType } from "../../../src/types";
import { NavDropdownState } from "./DesktopNav";
import styles from "./NavItem.module.css";
import { usePathname } from "next/navigation";

type Props = {
  item: NavItemType;
  onClick: ({ item, anchorEl }: NonNullable<NavDropdownState>) => void;
};

export default function NavItem({ item, onClick }: Props) {
  const navItemRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  function activeClassName() {
    switch (item._type) {
      case "navLink":
        return pathname === `/${item.slug}` ? styles.active : "";
      case "navDropdown":
        return item.items?.map(({ slug }) => `/${slug}`).includes(pathname)
          ? styles.active
          : "";
    }
  }

  return (
    <>
      {item._type === "navLink" && item.slug && (
        <Link
          href={item.slug}
          className={`${styles.root} ${styles["nav-link"]} ${activeClassName()}`}
        >
          {item.label}
        </Link>
      )}
      {item._type === "navDropdown" && (
        <div
          className={`${styles.root} ${activeClassName()}`}
          role="button"
          ref={navItemRef}
          onClick={() => onClick({ item, anchorEl: navItemRef.current })}
        >
          {item.label}
        </div>
      )}
    </>
  );
}
