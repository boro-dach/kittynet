import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import SessionWrapper from '../components/SessionWrapper'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const unbounded = Unbounded({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "kittynet",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <Analytics />
      <SpeedInsights />
      <html lang="en">
        <body className={unbounded.className}>
          <div className=" flex flex-col">
            <div><Header /></div>
            <div className=" flex flex-row justify-between">
              <div className=" ml-4">{children}</div>
              <div className=" sticky top-0">
                <input type="text" placeholder="искать" className=" rounded-md bg-white focus:outline-none text-sm py-1 px-2 mr-4 text-black"/>
              </div>
            </div>
          </div>
        </body>
      </html>
    </SessionWrapper>
  );
}