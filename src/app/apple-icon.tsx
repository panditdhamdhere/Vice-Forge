import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(145deg, #070b14 0%, #12081a 55%, #0e1628 100%)",
          color: "#f4ebe1",
          fontFamily: "Arial Black, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 28,
            border: "4px solid #2ef5c8",
            boxShadow: "0 0 28px rgba(255, 46, 139, 0.35)",
            background: "#0a101c",
            color: "#ff2e8b",
            fontSize: 54,
            fontWeight: 700,
            letterSpacing: -2,
          }}
        >
          VF
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
