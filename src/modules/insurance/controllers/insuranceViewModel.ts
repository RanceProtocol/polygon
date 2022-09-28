import { Web3Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ranceProtocol } from "../../../constants/addresses";
import { RanceProtocol__factory } from "../../../typechain";
import { getDefaultProvider } from "../../../wallet/utils";
import {
    initializePackagePlans as initializePackagePlansAction,
    intializeUserPackages as intializeUserPackagesAction,
    removeUserPackage as removeUserPackageAction,
} from "../infrastructure/redux/actions";
import { insure as insureUseCase } from "../usecases/insure";
import { cancelInsurance as cancelInsuranceUseCase } from "../usecases/cancelInsurance";
import { withdrawInsurance as withdrawInsuranceUseCase } from "../usecases/withdrawInsurance";
import { watchEvent } from "../../../utils/events";
import useTransaction from "../../../hooks/useTransaction";

interface IProps {
    address: string | null | undefined;
    provider: Web3Provider | undefined;
}

type addressType = keyof typeof ranceProtocol;
const dappEnv: addressType = process.env
    .NEXT_PUBLIC_DAPP_ENVIRONMENT as addressType;

export const useInsuranceViewModel = (props: IProps) => {
    const { address, provider } = props;
    const dispatch = useDispatch();
    const { send } = useTransaction();

    const insuranceContract = RanceProtocol__factory.connect(
        ranceProtocol[dappEnv],
        provider?.getSigner() || getDefaultProvider()
    );

    const initializePackagePlans = useCallback(async (): Promise<void> => {
        const insuranceContract = RanceProtocol__factory.connect(
            ranceProtocol[dappEnv],
            provider?.getSigner() || getDefaultProvider()
        );
        await initializePackagePlansAction(insuranceContract)(dispatch);
    }, [provider, dispatch]);

    const intializeUserPackages = useCallback(async (): Promise<void> => {
        const insuranceContract = RanceProtocol__factory.connect(
            ranceProtocol[dappEnv],
            provider?.getSigner() || getDefaultProvider()
        );
        await intializeUserPackagesAction(insuranceContract, address)(dispatch);
    }, [address, provider, dispatch]);

    const removeUserPackage = useCallback(
        async (packageId: string) => {
            dispatch(removeUserPackageAction(packageId));
        },
        [dispatch]
    );

    interface IinsureParams {
        planId: string;
        amount: BigNumber;
        path: string[];
        insureCoin: string;
        paymentToken: string;
        referrer?: string;
        callbacks: { [key: string]: (errorMessage?: string) => void };
    }

    const insure = useCallback(
        async ({
            planId,
            amount,
            path,
            insureCoin,
            paymentToken,
            referrer,
            callbacks,
        }: IinsureParams): Promise<void> => {
            await insureUseCase({
                contract: insuranceContract,
                planId,
                amount,
                path,
                insureCoin,
                paymentToken,
                referrer,
                send,
                callbacks,
            });
        },
        [insuranceContract, send]
    );

    interface ICancelParams {
        packageId: string;
        callbacks: { [key: string]: (errorMessage?: string) => void };
    }

    const cancelInsurance = useCallback(
        async ({ packageId, callbacks }: ICancelParams): Promise<void> => {
            await cancelInsuranceUseCase({
                contract: insuranceContract,
                packageId,
                send,
                callbacks,
            });
        },
        [insuranceContract, send]
    );

    interface IWithdrawParams {
        packageId: string;
        callbacks: { [key: string]: (errorMessage?: string) => void };
    }

    const withdrawInsurance = useCallback(
        async ({ packageId, callbacks }: IWithdrawParams): Promise<void> => {
            await withdrawInsuranceUseCase({
                contract: insuranceContract,
                packageId,
                send,
                callbacks,
            });
        },
        [insuranceContract, send]
    );

    useEffect(() => {
        watchEvent(
            insuranceContract,
            "InsuranceCancelled",
            [null, address],
            (_packageId, _user, event) => {
                setTimeout(() => removeUserPackage(_packageId), 2000); // this delay is a work around to ensure the modal is closed before the package is removed from the state to prevent app crash
            }
        );

        watchEvent(
            insuranceContract,
            "InsuranceWithdrawn",
            [null, address],
            (_packageId, _user, event) => {
                setTimeout(() => removeUserPackage(_packageId), 2000);
            }
        );

        return () => {
            insuranceContract.removeAllListeners();
        };
    }, [insuranceContract, address, removeUserPackage]);

    return {
        initializePackagePlans,
        intializeUserPackages,
        insure,
        cancelInsurance,
        withdrawInsurance,
    };
};
