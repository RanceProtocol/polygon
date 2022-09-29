export const supportedChainIds = {
    Mainnet: 137,
};
export const getSupportedChainsName = (chainId: number): string => {
    switch (chainId) {
        case 137:
            return "Polygon Mainnet";
        default:
            return "Polygon Mainnet";
    }
};
