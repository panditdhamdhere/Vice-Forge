import type { Metadata } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "VICE FORGE — Cover Identity Studio",
  description:
    "Forge a GTA VI–inspired cover identity with Unlayer React Image Editor, then drop it across Vice Coast.",
  applicationName: "VICE FORGE",
  openGraph: {
    title: "VICE FORGE",
    description:
      "Build a Vice Coast cover identity powered by React Image Editor.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
