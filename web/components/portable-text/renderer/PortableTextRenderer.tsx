import { PortableText, PortableTextTypeComponentProps } from "next-sanity";
import { ImageGalleryBlock, PageContent } from "../../../src/types";
import styles from "./PortableTextRenderer.module.css";
import { ColumnText } from "../../../src/sanity/types";
import ImageGallery from "../block-components/image-gallery/ImageGallery";

type Props = {
  content: PageContent;
};

export default function PortableTextRenderer({ content }: Props) {
  return (
    <div>
      <PortableText
        value={content}
        components={{
          marks: {
            anchor: ({ value, children }) => (
              <span
                id={value.slug?.current}
                className={styles["anchor-target"]}
              >
                {!value.hidden && children}
              </span>
            ),
          },
          block: {
            h1: ({ children }) => (
              <div
                style={{
                  // backgroundColor: "green",
                  fontSize: 48,
                  textAlign: "center",
                  // padding: 20,
                }}
              >
                {children}
              </div>
            ),
          },
          types: {
            columnText: ({
              value,
            }: PortableTextTypeComponentProps<ColumnText>) => (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>{value.col1 && <PortableText value={value.col1} />}</div>
                <div>{value.col2 && <PortableText value={value.col2} />}</div>
              </div>
            ),
            imageGallery: (
              props: PortableTextTypeComponentProps<ImageGalleryBlock>
            ) =>
              props.value.images && (
                <ImageGallery images={props.value.images} />
              ),
          },
        }}
      />
    </div>
  );
}
