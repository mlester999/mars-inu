import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import "./globals.css";

const openGraphImage = siteConfig.siteUrl
  ? `${siteConfig.siteUrl}/images/mars-hero-scene.png`
  : undefined;

export const metadata: Metadata = {
  title: "Mars Inu — Born on Earth. Clanking on Mars.",
  description:
    "A community-powered memecoin launched on Clank Trade and headed for the red planet.",
  metadataBase: siteConfig.siteUrl ? new URL(siteConfig.siteUrl) : undefined,
  openGraph: {
    title: "Mars Inu — Born on Earth. Clanking on Mars.",
    description:
      "A community-powered memecoin launched on Clank Trade and headed for the red planet.",
    type: "website",
    siteName: "Mars Inu",
    images: openGraphImage
      ? [{ url: openGraphImage, alt: "Mars Inu in an orange astronaut suit on Mars" }]
      : undefined,
  },
  twitter: {
    card: openGraphImage ? "summary_large_image" : "summary",
    title: "Mars Inu — Born on Earth. Clanking on Mars.",
    description: "A community-powered memecoin launched on Clank Trade.",
    images: openGraphImage ? [openGraphImage] : undefined,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
