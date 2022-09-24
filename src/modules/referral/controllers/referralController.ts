import { Web3Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ranceProtocol } from "../../../constants/addresses";
import { RanceProtocol__factory } from "../../../typechain";
import { getDefaultProvider } from "../../../wallet/utils";
import {
    getReferralCode as getReferralCodeAction,
    getReferralRecord as getReferralRecordAction,
    genarateReferralLink as genarateReferralLinkAction,
} from "../infrastructure/redux/actions";
import { watchEvent } from "../../../utils/events";
import useTransaction from "../../../hooks/useTransaction";
import useSignature from "../../../hooks/useSignature";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { apiClient } from "../infrastructure/ApiClient/axios";

interface IProps {
    address: string | null | undefined;
    provider: Web3Provider | undefined;
    connector: AbstractConnector;
}

type addressType = keyof typeof ranceProtocol;
const dappEnv: addressType = process.env
    .NEXT_PUBLIC_DAPP_ENVIRONMENT as addressType;

export const useReferralViewModel = (props: IProps) => {
    const { address, provider, connector } = props;
    const dispatch = useDispatch();
    const { send } = useTransaction();
    const { sign } = useSignature({
        library: provider,
        connector,
        account: address as string,
    });

    const insuranceContract = RanceProtocol__factory.connect(
        ranceProtocol[dappEnv],
        provider?.getSigner() || getDefaultProvider()
    );

    const initialize = useCallback(async (): Promise<void> => {
        // use Promise.all
        await getReferralCodeAction(address, apiClient)(dispatch);
        await getReferralRecordAction(insuranceContract, address)(dispatch);
    }, [address, insuranceContract, dispatch]);

    const genarateReferralLink = useCallback(async (): Promise<void> => {
        if (!address) return;
        const message = `Welcome to RanceProtocol!\n\nClick to sign and generate a referral code with which you earn earn reward\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n${address}`;
        await genarateReferralLinkAction(
            address,
            message,
            sign,
            apiClient
        )(dispatch);
    }, [address, dispatch, sign]);

    return {
        initialize,
    };
};
