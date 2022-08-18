export const supportedChainIds = {
    Mainnet: 137,
    Testnet: 80001,
};
export const getSupportedChainsName = (chainId: number): string => {
    switch (chainId) {
        case 137:
            return "Polygon Mainnet";
        case 80001:
            return "Polygon Mumbai Testnet";
        default:
            return "Polygon Mainnet";
    }
};
