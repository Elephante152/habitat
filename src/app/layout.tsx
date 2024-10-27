import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Habitat Weather App",
  description: "Weather forecasts and local discounts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
