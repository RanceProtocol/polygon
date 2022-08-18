import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { supportedChainIds } from "../../constants/chainIds";
import { RPC_URLS } from "../../constants/rpcUrls";

export const injected = new InjectedConnector({
    supportedChainIds: Object.values(supportedChainIds),
});
export const walletConnect = new WalletConnectConnector({
    rpc: {
        137: RPC_URLS[137],
    },
    chainId: 137,
    qrcode: true,
    bridge: "https://bridge.walletconnect.org",
});
