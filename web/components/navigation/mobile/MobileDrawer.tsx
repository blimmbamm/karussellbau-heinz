import { useEffect, useState } from "react";
import { NavigationQueryResult } from "../../../src/sanity/types";
import { NavDropdownItem } from "../../../src/types";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import MobileNavItem from "./MobileNavItem";
import styles from "./MobileDrawer.module.css";

type Props = {
  open: boolean;
  navQueryResult: NavigationQueryResult;
  onClose: () => void;
};

export default function MobileDrawer({ open, navQueryResult, onClose }: Props) {
  const [selectedDropdown, setSelectedDropdown] =
    useState<NavDropdownItem | null>(null);

  useEffect(() => {
    if (!open) {
      setSelectedDropdown(null);
    }
  }, [open]);

  return (
    <div className={`${styles.root} ${open ? styles.open : ""} `}>
      {!selectedDropdown &&
        navQueryResult?.items?.map((item) => (
          <MobileNavItem
            key={item._key}
            item={item}
            onClick={(item) => setSelectedDropdown(item)}
            onCloseDrawer={onClose}
          />
        ))}
      {selectedDropdown && (
        <>
          <div className={styles["dropdown-back-container"]}>
            <MoveLeft onClick={() => setSelectedDropdown(null)} />
            <span>{selectedDropdown.label}</span>
          </div>
          {selectedDropdown.items?.map(
            (item) =>
              item.slug && (
                <Link
                  key={item._key}
                  href={item.slug}
                  className={styles.link}
                  onNavigate={onClose}
                >
                  {item.label}
                </Link>
              )
          )}
        </>
      )}
    </div>
  );
}
