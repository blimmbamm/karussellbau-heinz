"use client";

import { useState } from "react";

type Image = {
  url: string | null;
  caption?: string;
};
type Props = {
  images?: Image[];
};
export default function ImageGallery({ images }: Props) {
  const [current, setCurrent] = useState<Image | null>(null);

  return (
    <>
      <div className="gallery">
        {images?.map((img, i) => (
          <img
            key={i}
            className="thumb"
            src={img.url || undefined}
            alt={img.caption}
            onClick={() => setCurrent(img)}
            style={{ width: "200px", cursor: "pointer" }}
          />
        ))}
      </div>

      {current && (
        <div
          className="lightbox"
          onClick={() => setCurrent(null)}
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.75)",
          }}
        >
          <img
            src={current.url || undefined}
            alt={current.caption}
            style={{ maxWidth: "90%", maxHeight: "90%" }}
          />
        </div>
      )}
    </>
  );
}
