import { Web3Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ranceProtocol } from "../../../constants/addresses";
import { RanceProtocol__factory } from "../../../typechain";
import { getDefaultProvider } from "../../../wallet/utils";
import {
    getReferralLink as getReferralLinkAction,
    getReferralRecord as getReferralRecordAction,
    genarateReferralLink as genarateReferralLinkAction,
    getReferrerAddress as getReferrerAddressAction,
} from "../infrastructure/redux/actions";
import { copyReferralLink as copyReferralLinkUsecase } from "../usecases/copyReferralLink";
// import { watchEvent } from "../../../utils/events";
// import useTransaction from "../../../hooks/useTransaction";
import useSignature from "../../../hooks/useSignature";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { apiClient } from "../infrastructure/ApiClient/axios";
import CustomToast, { STATUS, TYPE } from "../../../Components/CustomToast";
import { toast } from "react-toastify";

interface IProps {
    address: string | null | undefined;
    provider: Web3Provider | undefined;
    connector: AbstractConnector | undefined;
}

type addressType = keyof typeof ranceProtocol;
const dappEnv: addressType = process.env
    .NEXT_PUBLIC_DAPP_ENVIRONMENT as addressType;

export const useReferralViewModel = (props: IProps) => {
    const { address, provider, connector } = props;
    const dispatch = useDispatch();
    // const { send } = useTransaction();
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
        if (!address) return; //visit here later
        await getReferralLinkAction(address, apiClient)(dispatch);
        // await getReferralRecordAction(insuranceContract, address)(dispatch);
    }, [address, insuranceContract, dispatch]);

    const getReferrerAddress = useCallback(
        async (referralLink: string): Promise<void> => {
            await getReferrerAddressAction(referralLink, apiClient)(dispatch);
        },
        [dispatch]
    );

    const genarateReferralLink = useCallback(async (): Promise<void> => {
        if (!address) return;

        const message = `Welcome to RanceProtocol!\n\nClick to sign and generate a referral code with which you can earn reward\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n${address}`;
        await genarateReferralLinkAction(
            address,
            message,
            sign,
            apiClient
        )(dispatch);
    }, [address, dispatch, sign]);

    const copyReferralLink = useCallback((link: string): void => {
        const copied = copyReferralLinkUsecase(link);
        if (!copied) return;
        const toastBody = CustomToast({
            message: "Referral link copied",
            status: STATUS.SUCCESSFULL,
            type: TYPE.SUCCESSFULL,
        });
        toast(toastBody);
    }, []);

    return {
        initialize,
        getReferrerAddress,
        genarateReferralLink,
        copyReferralLink,
    };
};
