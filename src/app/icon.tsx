import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#070b14",
          border: "2px solid #2ef5c8",
          borderRadius: 6,
          color: "#ff2e8b",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: -0.5,
          fontFamily: "Arial Black, Helvetica, sans-serif",
        }}
      >
        VF
      </div>
    ),
    {
      ...size,
    },
  );
}
