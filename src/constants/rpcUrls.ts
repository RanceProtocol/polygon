export const RPC_URLS = {
    137: "https://polygon-rpc.com",
    80001: "https://matic-testnet-archive-rpc.bwarelabs.com",
};

export const RPC_LIST_MAP = {
    137: [
        // `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
        `https://polygon-mainnet.chainnodes.org/${process.env.NEXT_PUBLIC_CHAINNODES_KEY}`,
        "https://polygon-rpc.com",
        "https://rpc.ankr.com/polygon",
        "https://rpc-mainnet.matic.quiknode.pro",
    ],
    80001: "https://matic-testnet-archive-rpc.bwarelabs.com",
};
