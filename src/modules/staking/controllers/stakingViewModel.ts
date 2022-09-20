import { Web3Provider } from "@ethersproject/providers";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { stakingContractAddresses } from "../../../constants/addresses";
import useTransaction from "../../../hooks/useTransaction";
import { Staking1__factory, Staking2__factory } from "../../../typechain";
import { getDefaultProvider } from "../../../wallet/utils";
import { initializeStakingPools as initializeStakingPoolsAction } from "../ui/redux/actions";
import { updateStakingPool as updateStakingPoolAction } from "../ui/redux/actions";
import { compound as compoundUsecase } from "../usecases/compound";
import { stake as stakeUsecase } from "../usecases/stake";
import { unstake as unstakeUsecase } from "../usecases/unstake";
import { harvest as harvestUsecase } from "../usecases/harvest";
import { BigNumber } from "ethers";
import { watchEvent } from "../../../utils/events";

interface IProps {
    address: string | null | undefined;
    provider: Web3Provider | undefined;
}

type addressType = keyof typeof stakingContractAddresses;
const dappEnv: addressType = process.env
    .NEXT_PUBLIC_DAPP_ENVIRONMENT as addressType;

export const useStakingViewModel = (props: IProps) => {
    const { address, provider } = props;
    const dispatch = useDispatch();
    const { send } = useTransaction();

    const stakingContract1 = Staking1__factory.connect(
        stakingContractAddresses[dappEnv][0],
        provider?.getSigner() || getDefaultProvider()
    );

    const stakingContract2 = Staking2__factory.connect(
        stakingContractAddresses[dappEnv][1],
        provider?.getSigner() || getDefaultProvider()
    );

    const initializeStakingPools = useCallback(async () => {
        const stakingContract1 = Staking1__factory.connect(
            stakingContractAddresses[dappEnv][0],
            provider?.getSigner() || getDefaultProvider()
        );

        const stakingContract2 = Staking2__factory.connect(
            stakingContractAddresses[dappEnv][1],
            provider?.getSigner() || getDefaultProvider()
        );
        initializeStakingPoolsAction(
            stakingContract1,
            stakingContract2,
            address
        )(dispatch);
    }, [address, dispatch, provider]);

    const stake = useCallback(
        (
            stakingAddress: string,
            pId: number,
            amount: BigNumber,
            callbacks: { [key: string]: (errorMessage?: string) => void }
        ) => {
            const contract =
                stakingContract1.address === stakingAddress
                    ? stakingContract1
                    : stakingContract2;
            stakeUsecase({ contract, pId, amount, send, callbacks });
        },
        [stakingContract1, stakingContract2, send]
    );

    const unstake = useCallback(
        (
            stakingAddress: string,
            pId: number,
            amount: BigNumber,
            callbacks: { [key: string]: (errorMessage?: string) => void }
        ) => {
            const contract =
                stakingContract1.address === stakingAddress
                    ? stakingContract1
                    : stakingContract2;
            unstakeUsecase({ contract, pId, amount, send, callbacks });
        },
        [stakingContract1, stakingContract2, send]
    );

    const harvest = useCallback(
        (
            stakingAddress: string,
            pId: number,
            callbacks: { [key: string]: (errorMessage?: string) => void }
        ) => {
            const contract =
                stakingContract1.address === stakingAddress
                    ? stakingContract1
                    : stakingContract2;
            harvestUsecase({ contract, pId, send, callbacks });
        },
        [stakingContract1, stakingContract2, send]
    );

    const compound = useCallback(
        (
            stakingAddress: string,
            callbacks: { [key: string]: (errorMessage?: string) => void }
        ) => {
            if (stakingAddress !== stakingContract1.address) return; // only the pool in stakingContract1 has a pool that supports compounding
            compoundUsecase({ contract: stakingContract1, send, callbacks });
        },
        [stakingContract1, send]
    );

    useEffect(() => {
        watchEvent(stakingContract1, "Deposit", [null, 0, null], async () => {
            const contract = Staking1__factory.connect(
                stakingContractAddresses[dappEnv][0],
                provider?.getSigner() || getDefaultProvider()
            );
            updateStakingPoolAction(contract, 0, address)(dispatch);
        });

        watchEvent(stakingContract1, "Withdraw", [null, 0, null], async () => {
            const contract = Staking1__factory.connect(
                stakingContractAddresses[dappEnv][0],
                provider?.getSigner() || getDefaultProvider()
            );
            updateStakingPoolAction(contract, 0, address)(dispatch);
        });

        return () => {
            stakingContract1.removeAllListeners();
        };
    }, [stakingContract1, address, dispatch, provider]);

    useEffect(() => {
        watchEvent(stakingContract2, "Deposit", [null, 1, null], async () => {
            const contract = Staking2__factory.connect(
                stakingContractAddresses[dappEnv][1],
                provider?.getSigner() || getDefaultProvider()
            );
            updateStakingPoolAction(contract, 1, address)(dispatch);
        });

        watchEvent(stakingContract2, "Withdraw", [null, 1, null], async () => {
            const contract = Staking2__factory.connect(
                stakingContractAddresses[dappEnv][1],
                provider?.getSigner() || getDefaultProvider()
            );
            updateStakingPoolAction(contract, 1, address)(dispatch);
        });

        return () => {
            stakingContract2.removeAllListeners();
        };
    }, [stakingContract2, address, dispatch, provider]);

    return { initializeStakingPools, stake, unstake, harvest, compound };
};
