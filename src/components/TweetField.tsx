"use client";

import axios from "axios";
import { useState } from "react";
import { useWriteContract } from "wagmi";

const TweetField = () => {
  const [tweetContent, setTweetContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { writeContract } = useWriteContract();

  const handleTweet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tweetContent.trim()) {
      alert("Tweet content cannot be empty");
      return;
    }
    setIsLoading(true);

    try {
      const tweetData = {
        content: tweetContent,
        timeStamp: Math.floor(Date.now() / 1000).toString(),
      };
      console.log("Tweet data:", tweetData);
      const res = await axios.post("/api/jsonUpload", tweetData);
      console.log("Response from API:", res.data);
      alert("Tweet posted successfully!");
    } catch (error) {
      console.error("Error posting tweet:", error);
    } finally {
      setIsLoading(false);
      setTweetContent("");
    }
    console.log("Tweeting:", tweetContent);
  };

  return (
    <form
      className="p-4 border rounded-xl border-gray-200 bg-gray-900"
      onSubmit={handleTweet}
    >
      <div className="flex items-center gap-2">
        <img
          src="https://api.dicebear.com/7.x/pixel-art/svg"
          alt="Avatar"
          className="w-10 h-10 rounded-full"
        />
        <input
          type="text"
          value={tweetContent}
          onChange={(e) => setTweetContent(e.target.value)}
          placeholder="What's happening?"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`mt-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-blue-600 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default TweetField;
