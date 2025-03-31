import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import LayoutWrapper from "@/components/layout/layout-wrapper";
import AppProviders from "@/providers/AppProviders";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Revisela",
  description: "Revisela",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <AppProviders>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AppProviders>
      </body>
    </html>
  );
}

// Client component to handle the path checking
