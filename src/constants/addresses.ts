export const ranceProtocol = {
    staging: "0x29062E2B9771FB81Cd088245B4137F538B65099b",
    mainnet: "0xb61F97B7176b17f6732D457649D3E322FE5e5893",
};

export const stakingContractAddresses = {
    staging: [
        "0x95aa44a85647248216915331BC71248838F6AfaC",
        "0x90E29EeF76c85184A230101DfC5425eE1bc15812",
    ],
    mainnet: [
        "0x95aa44a85647248216915331BC71248838F6AfaC",
        "0x90E29EeF76c85184A230101DfC5425eE1bc15812",
    ],
};

export const tokens = {
    mainnet: {
        RANCE: "0x885C73a4F42F321a76F556CC99514A9BBd8e29bD",
        USDC: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    },
    staging: {
        RANCE: "0xa92CF4945dC605e29a72A965Ef55f2D342c70f8A",
        USDC: "0x627556f80539153717609A7Eac309c3C54c5480D",
    },
};

export const stakingAddressToPool: { [key: string]: number } = {
    "0x95aa44a85647248216915331BC71248838F6AfaC": 0, //staging
    "0x90E29EeF76c85184A230101DfC5425eE1bc15812": 1, //staging
};

export const masterRanceWallet = {
    staging: "0xb27D527Dc2b5b7811d13Dc0997870BcE6299df61",
    mainnet: "0xb27D527Dc2b5b7811d13Dc0997870BcE6299df61", // replaced with mainnet wallet later
};

export const POLYGONMM_ROUTER = "0x51aba405de2b25e5506dea32a6697f450ceb1a17";

export const multicall2Address = "0x275617327c958bD06b5D6b871E7f491D76113dd8";
