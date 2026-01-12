import { PortableText, PortableTextTypeComponentProps } from "next-sanity";
import { ImageGalleryBlock, PageContent, VideoBlock } from "../../../src/types";
import {
  ColumnText,
  HeadlineWithDate as HeadlineWithDateType,
  Table as TableType,
} from "../../../src/sanity/types";
import ImageGallery from "../block-components/image-gallery/ImageGallery";
import Table from "../block-components/table/Table";
import Video from "../block-components/video/Video";
import HeadlineWithDate from "../block-components/headline-with-date/HeadlineWithDate";

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
              <span id={value.slug?.current}>{!value.hidden && children}</span>
            ),
          },
          block: {
            pageTitle: ({ children }) => (
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
            table: (props: PortableTextTypeComponentProps<TableType>) => (
              <Table data={props.value} />
            ),
            video: (props: PortableTextTypeComponentProps<VideoBlock>) => (
              <Video data={props.value} />
            ),
            headlineWithDate: (
              props: PortableTextTypeComponentProps<HeadlineWithDateType>
            ) => <HeadlineWithDate data={props.value} />,
          },
        }}
      />
    </div>
  );
}
