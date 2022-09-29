import { AbstractConnector } from "@web3-react/abstract-connector";
import { bitKeep, injected, walletConnect } from "../connnectors";
import { useWeb3React } from "@web3-react/core";
import {
    getSupportedChainsName,
    supportedChainIds,
} from "../../constants/chainIds";
import { addNetwork, getConnectionError } from "../utils";
import { useCallback, useEffect } from "react";
import CustomToast, { STATUS, TYPE } from "../../Components/CustomToast";
import { toast } from "react-toastify";
import { getChainId } from "../../utils/helpers";
import { walletStrings } from "../constants";

const useWallet = () => {
    const { activate, deactivate } = useWeb3React();

    const _ethereumListener = async () =>
        new Promise<void>((resolve) =>
            Object.defineProperty(window, "ethereum", {
                get() {
                    return this._eth;
                },
                set(_eth) {
                    this._eth = _eth;

                    resolve();
                },
            })
        );

    // const _bitKeepListener = async () =>
    //     new Promise<void>((resolve) =>
    //         Object.defineProperty(window, "bitkeep", {
    //             get() {
    //                 return this._bitkeep;
    //             },
    //             set(_bitkeep) {
    //                 this._bitkeep = _bitkeep;
    //                 resolve();
    //             },
    //         })
    //     );

    useEffect(() => {
        const tryConnect = (connector: AbstractConnector) => {
            setTimeout(async () => {
                try {
                    alert(`trying to connect`);
                    await activate(connector, undefined, true);
                    alert(`have tried connecting`);
                } catch (error: any) {
                    alert(`connection error: ${error?.message}`);
                    const errorMessage = getConnectionError(error);
                    const body = CustomToast({
                        message: errorMessage,
                        status: STATUS.ERROR,
                        type: TYPE.ERROR,
                    });
                    toast(body);
                }
            });
        };

        const previouslyConnectedWallet = window.localStorage.getItem("wallet");
        alert(`previouslyConnectedWallet: , ${previouslyConnectedWallet}`);

        if (!!previouslyConnectedWallet) {
            injected.isAuthorized().then(async (isAuthorized: boolean) => {
                alert(`wallet is connected: ${isAuthorized}`);
                if (
                    isAuthorized &&
                    [
                        walletStrings.metamask,
                        walletStrings.trustwallet,
                        walletStrings.safepal,
                    ].includes(previouslyConnectedWallet)
                ) {
                    const isEthereumDefined = Reflect.has(window, "ethereum");
                    // handle opera lazy inject ethereum
                    if (!isEthereumDefined) {
                        _ethereumListener().then(() => tryConnect(injected));
                        return;
                    }
                    tryConnect(injected);
                } else {
                    bitKeep
                        .isAuthorized()
                        .then(async (isAuthorized: boolean) => {
                            if (
                                isAuthorized &&
                                [walletStrings.bitkeep].includes(
                                    previouslyConnectedWallet
                                )
                            ) {
                                const isBitkeepDefined = Reflect.has(
                                    window,
                                    "bitkeep"
                                );
                                if (isBitkeepDefined) {
                                    tryConnect(bitKeep);
                                    return;
                                }
                            }
                        });
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const connectWallet = useCallback(
        async (name: string) => {
            let connector: AbstractConnector;
            const walletName = name;
            const injectedWallets = [
                walletStrings.metamask,
                walletStrings.trustwallet,
                walletStrings.safepal,
            ];
            if (injectedWallets.includes(name)) name = "injected";
            switch (name) {
                case "injected":
                    connector = injected;
                    break;
                case walletStrings.bitkeep:
                    connector = bitKeep;
                    break;
                case walletStrings.walletconnect:
                    connector = walletConnect;
                    break;
                default:
                    return;
            }

            try {
                await activate(connector);
                const chainId = await connector.getChainId();
                const provider = await connector.getProvider();
                if (
                    !Object.values(supportedChainIds).includes(
                        Number(chainId)
                    ) &&
                    (name === "injected" || name === walletStrings.bitkeep)
                ) {
                    try {
                        await addNetwork(provider);
                    } catch (error: any) {
                        const body = CustomToast({
                            message: error?.message,
                            status: STATUS.ERROR,
                            type: TYPE.ERROR,
                        });
                        toast(body);
                    }
                } else if (
                    !Object.values(supportedChainIds).includes(Number(chainId))
                ) {
                    const body = CustomToast({
                        message: `Unsupported network detected! please switch to ${getSupportedChainsName(
                            getChainId()
                        )}`,
                        status: STATUS.ERROR,
                        type: TYPE.ERROR,
                    });
                    toast(body);
                }
                window.localStorage.setItem("wallet", walletName);
            } catch (error: any) {
                console.error(error);
                let body;
                if (error.code === -32002) {
                    body = CustomToast({
                        message: "You have a pending connection request",
                        status: STATUS.ERROR,
                        type: TYPE.ERROR,
                    });
                } else if (error.name === "NoEthereumProviderError") {
                    body = CustomToast({
                        message:
                            "You are not on Ethereum enabled browser, Please use WalletConnect",
                        status: STATUS.ERROR,
                        type: TYPE.ERROR,
                    });
                } else {
                    body = CustomToast({
                        message: error.message,
                        status: STATUS.ERROR,
                        type: TYPE.ERROR,
                    });
                }
                toast(body);
            }
        },
        [activate]
    );

    const disconnectWallet = () => {
        deactivate();
        window.localStorage.removeItem("wallet");
        // This localStorage key is set by @web3-react/walletconnect-connector
        if (window?.localStorage?.getItem("walletconnect")) {
            walletConnect.close();
            walletConnect.walletConnectProvider = null;
        }
    };

    return { connectWallet, disconnectWallet };
};

export default useWallet;
