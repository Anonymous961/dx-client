"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../rainbowKitConfig";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

export function Providers(props: { children: ReactNode; initialState?: any }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{props.children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
