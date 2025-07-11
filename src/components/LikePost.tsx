import {
  useAccount,
  useChainId,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { Tweet } from "./Feed";
import { chainsToTwitter, twitterAbi } from "@/constant";
import { Abi } from "viem";
import { useEffect, useState } from "react";

export default function LikePost({ tweet }: { tweet: Tweet }) {
  const { address } = useAccount();
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const chainId = useChainId();
  const { writeContract } = useWriteContract();

  const { data: isLiked } = useReadContract({
    abi: twitterAbi as Abi,
    address: chainsToTwitter[chainId],
    functionName: "likedBy",
    args: [tweet.id, address],
    query: {
      enabled: !!address,
    },
  });

  useEffect(() => {
    if (typeof isLiked !== undefined) {
      setHasLiked(Boolean(isLiked));
      setIsLoading(false);
    }
  }, [isLiked]);

  function handleLikeAction() {
    if (!address) return;

    if (hasLiked) {
      handleUnlike();
    } else {
      handleLike();
    }
  }

  function handleLike() {
    writeContract({
      abi: twitterAbi as Abi,
      address: chainsToTwitter[chainId],
      functionName: "likeTweet",
      args: [tweet.id],
    });
  }

  function handleUnlike() {
    writeContract({
      abi: twitterAbi as Abi,
      address: chainsToTwitter[chainId],
      functionName: "unlikeTweet",
      args: [tweet.id],
    });
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-1 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span className="text-sm">{tweet.likes.toString()}</span>
      </div>
    );
  }

  return (
    <button
      className={`flex items-center gap-1 transition-colors ${
        hasLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
      }`}
      onClick={handleLikeAction}
      disabled={!address}
      title={!address ? "Connect wallet to like" : hasLiked ? "Unlike" : "Like"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill={hasLiked ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span className="text-sm">{tweet.likes.toString()}</span>
    </button>
  );
}
