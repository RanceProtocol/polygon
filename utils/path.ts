import {
    UniswapPair,
    UniswapVersion,
    UniswapPairSettings,
    TradeDirection,
} from "simple-uniswap-sdk";
import { constants } from "ethers";

interface Params {
    fromTokenContractAddress: string;
    toTokenContractAddress: string;
    amount: string;
    provider: any;
}

export const findBestRoute = async (
    params: Params
): Promise<{ path: string[]; expectedOutput: string }> => {
    const {
        fromTokenContractAddress,
        toTokenContractAddress,
        amount,
        provider,
    } = params;

    const cloneUniswapContractDetails = {
        v2Override: {
            routerAddress: "0x51aba405de2b25e5506dea32a6697f450ceb1a17",
            factoryAddress: "0x7cFB780010e9C861e03bCbC7AC12E013137D47A5",
            pairAddress: "0x7cFB780010e9C861e03bCbC7AC12E013137D47A5",
        },
    };

    const uniswapPair = new UniswapPair({
        fromTokenContractAddress,
        toTokenContractAddress,
        ethereumAddress: constants.AddressZero,
        ethereumProvider: provider,
        settings: new UniswapPairSettings({
            slippage: 0.001,
            deadlineMinutes: 20,
            disableMultihops: false,
            uniswapVersions: [UniswapVersion.v2],
            cloneUniswapContractDetails: cloneUniswapContractDetails,
            customNetwork: {
                nameNetwork: "Polygon Mainnet",
                multicallContractAddress:
                    "0x275617327c958bD06b5D6b871E7f491D76113dd8",
                nativeCurrency: {
                    name: "Polygon",
                    symbol: "MATIC",
                },
                nativeWrappedTokenInfo: {
                    chainId: 137,
                    contractAddress:
                        "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
                    decimals: 18,
                    symbol: "WMATIC",
                    name: "Wrapped MATIC",
                },
            },
        }),
    });

    try {
        const uniswapPairFactory = await uniswapPair.createFactory();

        const result = await uniswapPairFactory.findBestRoute(
            amount,
            TradeDirection.input
        );

        return {
            path: result.bestRouteQuote.routePathArray,
            expectedOutput:
                result.bestRouteQuote
                    .expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
        };
    } catch (error) {
        throw error;
    }
};
