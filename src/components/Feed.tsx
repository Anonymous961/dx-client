"use client";

import { useState, useEffect, useMemo } from "react";
import { chainsToTwitter, twitterAbi } from "@/constant";
import axios from "axios";
import { Abi } from "viem";
import { useChainId, useReadContract, useReadContracts } from "wagmi";
import LikePost from "./LikePost";
import { formatDistanceToNow } from "date-fns";

export interface Tweet {
  id: bigint;
  author: string;
  contentCID: string;
  timestamp: bigint;
  likes: bigint;
}

export default function Feed() {
  const chainId = useChainId();
  const [contents, setContents] = useState<Record<string, any>>({});

  const { data: tweetCount } = useReadContract({
    abi: twitterAbi as Abi,
    address: chainsToTwitter[chainId],
    functionName: "tweetCount",
  });

  const allTweets = useMemo(
    () =>
      Array.from({ length: tweetCount ? Number(tweetCount) : 0 }, (_, i) => ({
        address: chainsToTwitter[chainId],
        abi: twitterAbi as Abi,
        functionName: "getTweet",
        args: [i],
      })),
    [tweetCount, chainId]
  );

  const { data: tweets } = useReadContracts({ contracts: allTweets });

  useEffect(() => {
    if (!tweets) return;

    const fetchAllContents = async () => {
      const newContents: Record<string, any> = {};
      for (const tweetResult of tweets) {
        if (tweetResult.status === "success") {
          const tweet = tweetResult.result as Tweet;
          try {
            const res = await axios.get(
              `/api/fetch-tweet?cid=${tweet.contentCID}`
            );
            newContents[tweet.contentCID] = res.data;
          } catch (error) {
            newContents[tweet.contentCID] = { content: "Failed to load tweet" };
          }
        }
      }
      setContents(newContents);
    };

    fetchAllContents();
  }, [tweets]);

  if (!tweets) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {tweets.map((tweetResult, index) => {
        if (tweetResult.status !== "success") return null;
        const tweet = tweetResult.result as Tweet;
        const content = contents[tweet.contentCID] || { content: "Loading..." };

        return (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-gray-900"
          >
            {/* Author Info */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={`https://xsgames.co/randomusers/avatar.php?g=pixel&seed=${tweet.author}`}
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-white">{tweet.author}</p>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(
                    new Date(Number(tweet.timestamp) * 1000),
                    { addSuffix: true }
                  )}
                </p>
              </div>
            </div>

            {/* Tweet Content */}
            <p className="text-gray-200 mb-4 whitespace-pre-line">
              {content.content}
            </p>

            {/* Tweet Actions */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="text-sm">24</span>
              </button>

              <button className="flex items-center gap-1 text-gray-500 hover:text-green-500 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="text-sm">12</span>
              </button>

              <LikePost tweet={tweet} />

              <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
