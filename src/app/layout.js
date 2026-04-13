import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ReduxProvider from "@/components/Layout/ReduxProvider";
import CookieConsent from "@/components/Layout/CookieConsent";
import LayoutWrapper from "@/components/Layout/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MPA Research - Publish Your Manuscript",
  description: "Join thousands of researchers publishing their work with MPA Research.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>

          <LayoutWrapper>
            {children}
          </LayoutWrapper>

          <CookieConsent />
        </ReduxProvider>
      </body>
    </html>
  );
}