import "./globals.css";
import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";

const siteUrl = "https://dhunanyan.com/taskflow-board";
const title = "TaskFlow Board";
const description = "Production-ready dark-mode draggable Kanban board for Web and Desktop (macOS, Windows, Linux).";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: title,
  title: {
    default: title,
    template: `%s | ${title}`
  },
  description,
  keywords: [
    "TaskFlow",
    "Kanban",
    "Todo",
    "Task Board",
    "Next.js",
    "Electron",
    "Desktop App",
    "Drag and Drop"
  ],
  authors: [{ name: "Dhunanyan", url: "https://dhunanyan.com" }],
  creator: "Dhunanyan",
  publisher: "Dhunanyan",
  category: "productivity",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName: title,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TaskFlow Board"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@dhunanyan",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: [
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    shortcut: [{ url: "/icons/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/icons/mask-icon.svg", color: "#47b2ff" }]
  },
  manifest: "/site.webmanifest"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080c14",
  colorScheme: "dark"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
