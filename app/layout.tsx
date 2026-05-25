import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Todo Board",
  description: "Web + Desktop draggable todo board"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
