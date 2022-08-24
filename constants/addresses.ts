export const ranceProtocol = {
    staging: "0x29062E2B9771FB81Cd088245B4137F538B65099b",
    mainnet: "",
};

export const stakingContractAddresses = {
    staging: [
        "0xd28bb38195b1a8a7f29161d897b46a3e8e284692",
        "0xcfe3ab15563442b41248076c11bf5abb63c46e41",
    ],
    mainnet: [
        "0xd28bb38195b1a8a7f29161d897b46a3e8e284692",
        "0xcfe3ab15563442b41248076c11bf5abb63c46e41",
    ],
};

export const tokens = {
    mainnet: {
        RANCE: "",
        USDC: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    },
    staging: {
        RANCE: "0xa92CF4945dC605e29a72A965Ef55f2D342c70f8A",
        USDC: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    },
};

export const stakingAddressToPool: { [key: string]: number } = {
    "0xd28bb38195b1a8a7f29161d897b46a3e8e284692": 0, //staging
    "0xcfe3ab15563442b41248076c11bf5abb63c46e41": 1, //staging
};

export const masterRanceWallet = {
    staging: "0x91A8BEF2bEBD46fBD079667DcE72865C1f015df0",
    mainnet: "0x91A8BEF2bEBD46fBD079667DcE72865C1f015df0", // replaced with mainnet wallet later
};

export const POLYGONMM_ROUTER = "0x51aba405de2b25e5506dea32a6697f450ceb1a17";
