"use client";

import { useAccount } from "wagmi";
import TweetField from "./TweetField";
import Feed from "./Feed";

export default function HomeContent() {
  const { isConnected } = useAccount();
  return (
    <div className="gap-4">
      {isConnected ? (
        <div className="flex flex-col gap-4">
          <TweetField />
          <Feed />
        </div>
      ) : (
        <div>Please connect to wallet</div>
      )}
    </div>
  );
}
