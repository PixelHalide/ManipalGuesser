import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";
import "@theme-toggles/react/css/Expand.css"
import NavbarAuth from "../Components/NavbarAuth";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "ManipalGuessr - Campus Location Guessing Game",
  description: "Test your knowledge of Manipal campus! Guess locations around Manipal from photos and compete with friends on the leaderboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col transition-all">
        <Providers>
          <GoogleAnalytics gaId="G-ZRFNTZL6ZN" />
          <NavbarAuth />
            {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
