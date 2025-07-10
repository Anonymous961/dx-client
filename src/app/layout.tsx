import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";
import { cookieToInitialState } from "wagmi";
import getConfig from "next/config";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "DX",
  description: "Decentralized x like application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get("cookie")
  );
  return (
    <html lang="en">
      <body>
        <Providers initialState={initialState}>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
