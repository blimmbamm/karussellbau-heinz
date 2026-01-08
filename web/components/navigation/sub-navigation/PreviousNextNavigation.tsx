import Link from "next/link";
import { PageBySlugQueryResult } from "../../../src/sanity/types";
import styles from "./PreviousNextNavigation.module.css";
import { MoveLeft, MoveRight } from "lucide-react";

type Props = {
  pageData: PageBySlugQueryResult;
};

export default function PreviousNextNavigation({ pageData }: Props) {
  let previous = null;
  let next = null;

  const dropdownItems = pageData.page?.navContext?.dropdown?.items;

  if (dropdownItems) {
    const currentItemIndex = dropdownItems.findIndex(
      (item) => item.page?._ref === pageData.page?._id
    );

    previous = dropdownItems[currentItemIndex - 1] ?? null;
    next = dropdownItems[currentItemIndex + 1] ?? null;
  }

  if (!previous && !next) return null;

  return (
    <div className={styles.root}>
      {previous?.label && (
        <Link className={styles.link} href={previous?.slug ?? ""}>
          <div className={styles.label}>
            <MoveLeft size={16} />
            <span>{previous?.label}</span>
          </div>
        </Link>
      )}
      <div style={{ flex: 1 }} />
      {next?.label && (
        <Link className={styles.link} href={next?.slug ?? ""}>
          <div className={styles.label}>
            <span>{next?.label}</span>
            <MoveRight size={16} />
          </div>
        </Link>
      )}
    </div>
  );
}
