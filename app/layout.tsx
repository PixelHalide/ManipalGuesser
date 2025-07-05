import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import "@theme-toggles/react/css/Expand.css"
import NavbarAuth from "../Components/NavbarAuth";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "ManipalGuessr",
  description: "Guess the location in Manipal!",
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
          <NavbarAuth />
          <div className="flex-grow">
            {children}
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
