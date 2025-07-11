export interface ContractConfig {
    [chainId: number]: `0x${string}`
}

export const chainsToTwitter: ContractConfig = {
    31337: "0x5fbdb2315678afecb367f032d93f642f64180aa3"
}

export const twitterAbi = [
    {
        "type": "function",
        "name": "createTweet",
        "inputs": [
            {
                "name": "_contentCID",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getTweet",
        "inputs": [
            {
                "name": "_tweetId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct Twitter.Tweet",
                "components": [
                    {
                        "name": "id",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "author",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "contentCID",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "timestamp",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "likes",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "likeTweet",
        "inputs": [
            {
                "name": "_tweetId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "likedBy",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "tweetCount",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "tweets",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "author",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "contentCID",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "likes",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "unlikeTweet",
        "inputs": [
            {
                "name": "_tweetId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "TweetCreated",
        "inputs": [
            {
                "name": "id",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "author",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "contentCID",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TweetLiked",
        "inputs": [
            {
                "name": "tweetId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "liker",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TweetUnliked",
        "inputs": [
            {
                "name": "tweetId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "unliker",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    }
]