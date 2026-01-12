"use client";

import Link from "next/link";
import { NavDropdownItemType, NavItemType } from "../../../src/types";
import { usePathname } from "next/navigation";
import styles from "./MobileNavItem.module.css";

type Props = {
  item: NavItemType;
  onClick: (item: NonNullable<NavDropdownItemType>) => void;
  onCloseDrawer: () => void;
};

export default function MobileNavItem({ item, onClick, onCloseDrawer }: Props) {
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
          onNavigate={onCloseDrawer}
        >
          {item.label}
        </Link>
      )}
      {item._type === "navDropdown" && (
        <div
          className={`${styles.root} ${activeClassName()}`}
          role="button"
          onClick={() => onClick(item)}
        >
          {item.label}
        </div>
      )}
    </>
  );
}
