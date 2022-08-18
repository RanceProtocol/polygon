export const ranceProtocol = {
    staging: "0x29062E2B9771FB81Cd088245B4137F538B65099b",
    mainnet: "",
};

export const stakingContractAddresses = {
    staging: [
        "0xB1ad1e8612C228e4A6C9cDed64d8A270157c9455",
        "0x1D17EE3b2eD935305b77D72Ab883D3827bC2E605",
    ],
    mainnet: [
        "0xB1ad1e8612C228e4A6C9cDed64d8A270157c9455",
        "0x1D17EE3b2eD935305b77D72Ab883D3827bC2E605",
    ],
};

export const tokens = {
    mainnet: {
        RANCE: "",
        USDC: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    },
    staging: {
        RANCE: "0xa92CF4945dC605e29a72A965Ef55f2D342c70f8A", // CHANGE
        USDC: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    },
};

export const stakingAddressToPool: { [key: string]: number } = {
    "0xB1ad1e8612C228e4A6C9cDed64d8A270157c9455": 0, //staging
    "0x1D17EE3b2eD935305b77D72Ab883D3827bC2E605": 1, //staging
};

export const masterRanceWallet = {
    staging: "0x91A8BEF2bEBD46fBD079667DcE72865C1f015df0",
    mainnet: "0x91A8BEF2bEBD46fBD079667DcE72865C1f015df0", // replaced with mainnet wallet later
};

export const AUTOSHARK_ADDRESSES = "0xB0EeB0632bAB15F120735e5838908378936bd484";
