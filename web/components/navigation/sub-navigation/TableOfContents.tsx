import { PageBySlugQueryResult } from "../../../src/sanity/types";
import styles from "./TableOfContents.module.css";

type Props = {
  pageData: PageBySlugQueryResult;
};

export default function TableOfContents({ pageData }: Props) {
  const tableOfContents = pageData.page?.content
    ?.filter((b) => b._type === "block")
    .flatMap((block) =>
      block.children?.flatMap(
        (child) =>
          child.marks?.map((mark: string) => {
            const def = block.markDefs?.find(
              (d) => d._key === mark && d._type === "anchor"
            );
            if (!def?.slug?.current) return null;

            return {
              label: def.label,
              href: `#${def.slug.current}`,
            };
          }) ?? []
      )
    )
    .filter(Boolean);

  if (tableOfContents?.length === 0) return null;

  return (
    <div className={styles.root}>
      <div className={styles.title}>Inhalt</div>
      {tableOfContents?.map((tocItem) => (
        <a key={tocItem?.href} className={styles.link} href={tocItem?.href}>
          {tocItem?.label}
        </a>
      ))}
    </div>
  );
}
