import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { anvil } from "wagmi/chains";

export const config = getDefaultConfig({
    appName: 'DX',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
    chains: [anvil],
    ssr: false
});