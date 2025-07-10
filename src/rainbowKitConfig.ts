import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { cookieStorage, createStorage } from "wagmi";
import { anvil, sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
    appName: 'DX',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
    chains: [anvil, sepolia],
    ssr: true,
    storage: createStorage({
        storage: cookieStorage,
    }),
});