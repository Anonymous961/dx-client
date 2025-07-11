"use client";

import { useAccount } from "wagmi";
import TweetField from "./TweetField";
import Feed from "./Feed";

export default function HomeContent() {
  const { isConnected } = useAccount();
  return (
    <div className=" flex flex-col justify-center  gap-4">
      {isConnected ? (
        <div className=" gap-4">
          <TweetField />
        </div>
      ) : (
        <div className="border-2 border-white p-4 rounded-xl m-4 bg-gray-500 text-red-600">
          Please connect to wallet
        </div>
      )}
      <Feed />
    </div>
  );
}
