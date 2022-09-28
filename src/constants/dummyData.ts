import { BigNumber, ethers, utils } from "ethers";
import { IinsurableCoins } from "./data";

export enum PackageEnum {
    SILVER = "Silver",
    GOLD = "Gold",
    PLATINUM = "Platinum",
}

export interface IinsurancePackagePlan {
    packageType: PackageEnum;
    name: string;
    duration: number;
    timeUnit: "MTH" | "YR" | "YRS";
    timeUnitFull: "months" | "year" | "years";
    insuranceFee: number;
    unsureFee: BigNumber;
}

export interface IInsurancePackage {
    packageId: string;
    initialDeposit: BigNumber;
    insureOutput: BigNumber;
    startTimestamp: number;
    endTimestamp: number;
    active: boolean;
    isCancelled: boolean;
    isWithdrawn: boolean;
    insureCoin: string;
    paymentToken: string;
    packagePlan: IinsurancePackagePlan;
}

export interface IStakingPool {
    poolId: string;
    stakeToken: string;
    earnToken: string;
    apr: number;
    totalStaked: number;
    totalStakedUsd: number;
    totalEarning: number;
    totalEarningUsd: number;
    staked: number;
    stakedUsd: number;
    contractUrl: string;
    walletUnlockStatus: boolean;
    stakeTokenPrice: number;
}

export const insurableCoins: IinsurableCoins[] = [
    "WBTC",
    "WETH",
    "WCRO",
    "MMF",
];

export const insurancePackagePlans: IinsurancePackagePlan[] = [
    {
        packageType: PackageEnum.SILVER,
        name: `${PackageEnum.SILVER} Package`,
        duration: 6,
        timeUnit: "MTH",
        timeUnitFull: "months",
        insuranceFee: 100,
        unsureFee: utils.parseEther("10"),
    },
    {
        packageType: PackageEnum.GOLD,
        name: `${PackageEnum.GOLD} Package`,
        duration: 1,
        timeUnit: "YR",
        timeUnitFull: "year",
        insuranceFee: 50,
        unsureFee: utils.parseEther("100"),
    },
    {
        packageType: PackageEnum.PLATINUM,
        name: `${PackageEnum.PLATINUM} Package`,
        duration: 2,
        timeUnit: "YRS",
        timeUnitFull: "years",
        insuranceFee: 25,
        unsureFee: utils.parseEther("1000"),
    },
];

export const insurancePackages: IInsurancePackage[] = [
    {
        packageId: "0x123",
        initialDeposit: utils.parseEther("1500"),
        insureOutput: utils.parseEther("1.1"),
        startTimestamp: 1655424000,
        endTimestamp: 1686960000,
        active: true,
        isCancelled: false,
        isWithdrawn: false,
        insureCoin: "0xe44Fd7fCb2b1581822D0c862B68222998a0c299a",
        paymentToken: "0x95aEaF383E2e86A47c11CffdE1F7944eCB2C38C2",
        packagePlan: {
            packageType: PackageEnum.GOLD,
            name: `${PackageEnum.GOLD} Package`,
            duration: 1,
            timeUnit: "YR",
            timeUnitFull: "year",
            insuranceFee: 50,
            unsureFee: utils.parseEther("10"),
        },
    },
    {
        packageId: "0x124",
        initialDeposit: utils.parseEther("12500"),
        insureOutput: utils.parseEther("0.5"),
        startTimestamp: 1654041600,
        endTimestamp: 1717200000,
        active: true,
        isCancelled: false,
        isWithdrawn: false,
        insureCoin: "0x062E66477Faf219F25D27dCED647BF57C3107d52",
        paymentToken: "0x95aEaF383E2e86A47c11CffdE1F7944eCB2C38C2",
        packagePlan: {
            packageType: PackageEnum.PLATINUM,
            name: `${PackageEnum.PLATINUM} Package`,
            duration: 2,
            timeUnit: "YRS",
            timeUnitFull: "years",
            insuranceFee: 25,
            unsureFee: utils.parseEther("100"),
        },
    },
];

export const stakingPools: IStakingPool[] = [
    {
        poolId: "124",
        stakeToken: "RANCE",
        earnToken: "RANCE",
        apr: 13.7,
        totalStaked: 234500.2,
        totalStakedUsd: 234500.2,
        totalEarning: 134500.2,
        totalEarningUsd: 134500.2,
        staked: 0,
        stakedUsd: 0,
        contractUrl: "https://cronoscan.com/address/0x1234",
        walletUnlockStatus: false,
        stakeTokenPrice: 100,
    },
    {
        poolId: "123",
        stakeToken: "RANCE",
        earnToken: "MUSD",
        apr: 93.7,
        totalStaked: 234500.2,
        totalStakedUsd: 234500.2,
        totalEarning: 134500.2,
        totalEarningUsd: 134500.2,
        staked: 1,
        stakedUsd: 0,
        contractUrl: "https://cronoscan.com/address/0x1234",
        walletUnlockStatus: true,
        stakeTokenPrice: 100,
    },
];

export enum IReferralStatus {
    AVAILABLE = "Available",
    WITHDRAWN = "Withdrawn",
}

export interface IReferralRecord {
    date: string;
    address: string;
    rewardAmount: string;
    rewardTokenSymbol: string;
    status: IReferralStatus;
}

export const referralRecords: IReferralRecord[] = [
    {
        date: "23-04-2022",
        address: "0xaa42274d4B6369fd9fEb349Bf4eFBC14A649e3Fd",
        rewardAmount: "20",
        rewardTokenSymbol: "USDT",
        status: IReferralStatus.WITHDRAWN,
    },
    {
        date: "23-04-2022",
        address: "0xaa42274d4B6369fd9fEb349Bf4eFBC14A649e3Fe",
        rewardAmount: "20",
        rewardTokenSymbol: "USDT",
        status: IReferralStatus.WITHDRAWN,
    },
    {
        date: "23-04-2022",
        address: "0xaa42274d4B6369fd9fEb349Bf4eFBC14A649e3Ff",
        rewardAmount: "20",
        rewardTokenSymbol: "USDT",
        status: IReferralStatus.WITHDRAWN,
    },
    {
        date: "23-04-2022",
        address: "0xaa42274d4B6369fd9fEb349Bf4eFBC14A649e3F",
        rewardAmount: "20",
        rewardTokenSymbol: "USDT",
        status: IReferralStatus.WITHDRAWN,
    },
    {
        date: "23-04-2022",
        address: "0xaa42274d4B6369fd9fEb349Bf4eFBC14A649e3F0",
        rewardAmount: "20",
        rewardTokenSymbol: "USDT",
        status: IReferralStatus.WITHDRAWN,
    },
    {
        date: "23-04-2022",
        address: "0xaa42274d4B6369fd9fEb349Bf4eFBC14A649e3F1",
        rewardAmount: "20",
        rewardTokenSymbol: "USDT",
        status: IReferralStatus.WITHDRAWN,
    },
    {
        date: "23-04-2022",
        address: "0xaa42274d4B6369fd9fEb349Bf4eFBC14A649e3F2",
        rewardAmount: "20",
        rewardTokenSymbol: "USDT",
        status: IReferralStatus.WITHDRAWN,
    },
    {
        date: "23-04-2022",
        address: "0xaa42274d4B6369fd9fEb349Bf4eFBC14A649e3F3",
        rewardAmount: "20",
        rewardTokenSymbol: "USDT",
        status: IReferralStatus.WITHDRAWN,
    },
    {
        date: "23-04-2022",
        address: "0xaa42274d4B6369fd9fEb349Bf4eFBC14A649e3F4",
        rewardAmount: "20",
        rewardTokenSymbol: "USDT",
        status: IReferralStatus.WITHDRAWN,
    },
    {
        date: "23-04-2022",
        address: "0xaa42274d4B6369fd9fEb349Bf4eFBC14A649e3F5",
        rewardAmount: "20",
        rewardTokenSymbol: "USDT",
        status: IReferralStatus.WITHDRAWN,
    },
    {
        date: "23-04-2022",
        address: "0xaa42274d4B6369fd9fEb349Bf4eFBC14A649e3F6",
        rewardAmount: "20",
        rewardTokenSymbol: "USDT",
        status: IReferralStatus.WITHDRAWN,
    },
    {
        date: "23-04-2022",
        address: "0xaa42274d4B6369fd9fEb349Bf4eFBC14A649e3F7",
        rewardAmount: "20",
        rewardTokenSymbol: "USDT",
        status: IReferralStatus.WITHDRAWN,
    },
    {
        date: "23-04-2022",
        address: "0xaa42274d4B6369fd9fEb349Bf4eFBC14A649e3F8",
        rewardAmount: "20",
        rewardTokenSymbol: "USDT",
        status: IReferralStatus.WITHDRAWN,
    },
    {
        date: "23-04-2022",
        address: "0xaa42274d4B6369fd9fEb349Bf4eFBC14A649e3F9",
        rewardAmount: "20",
        rewardTokenSymbol: "USDT",
        status: IReferralStatus.WITHDRAWN,
    },
    {
        date: "23-04-2022",
        address: "0xaa42274d4B6369fd9fEb349Bf4eFBC14A649e3Fd",
        rewardAmount: "20",
        rewardTokenSymbol: "USDT",
        status: IReferralStatus.WITHDRAWN,
    },
    {
        date: "23-04-2022",
        address: "0xaa42274d4B6369fd9fEb349Bf4eFBC14A649e3Fd",
        rewardAmount: "20",
        rewardTokenSymbol: "USDT",
        status: IReferralStatus.WITHDRAWN,
    },
    {
        date: "23-04-2022",
        address: "0xaa42274d4B6369fd9fEb349Bf4eFBC14A649e3Fd",
        rewardAmount: "20",
        rewardTokenSymbol: "USDT",
        status: IReferralStatus.WITHDRAWN,
    },
    {
        date: "23-04-2022",
        address: "0xaa42274d4B6369fd9fEb349Bf4eFBC14A649e3Fd",
        rewardAmount: "20",
        rewardTokenSymbol: "USDT",
        status: IReferralStatus.WITHDRAWN,
    },
    {
        date: "23-04-2022",
        address: "0xaa42274d4B6369fd9fEb349Bf4eFBC14A649e3F0",
        rewardAmount: "20",
        rewardTokenSymbol: "USDT",
        status: IReferralStatus.WITHDRAWN,
    },
    {
        date: "23-04-2022",
        address: "0xaa42274d4B6369fd9fEb349Bf4eFBC14A649e3Fa",
        rewardAmount: "20",
        rewardTokenSymbol: "USDT",
        status: IReferralStatus.WITHDRAWN,
    },
];
