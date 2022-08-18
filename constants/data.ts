export enum PackageEnum {
    SILVER = "Silver",
    GOLD = "Gold",
    PLATINUM = "Platinum",
}

export type IinsurableCoins = "WBTC" | "WETH" | "WCRO" | "MMF";

export const insurableCoins: IinsurableCoins[] = [
    "WBTC",
    "WETH",
    "WCRO",
    "MMF",
];

export interface IinsurancePackagePlanDetails {
    packageType: PackageEnum;
    name: string;
    duration: number;
    timeUnit: "MTH" | "YR" | "YRS";
    timeUnitFull: "months" | "year" | "years";
}

export const periodInMonthsToPlanData: {
    [key: number]: IinsurancePackagePlanDetails;
} = {
    6: {
        packageType: PackageEnum.SILVER,
        name: `${PackageEnum.SILVER} Package`,
        duration: 6,
        timeUnit: "MTH",
        timeUnitFull: "months",
    },
    12: {
        packageType: PackageEnum.GOLD,
        name: `${PackageEnum.GOLD} Package`,
        duration: 1,
        timeUnit: "YR",
        timeUnitFull: "year",
    },
    24: {
        packageType: PackageEnum.PLATINUM,
        name: `${PackageEnum.PLATINUM} Package`,
        duration: 2,
        timeUnit: "YRS",
        timeUnitFull: "years",
    },
};

export const getDurationData = (periodInSeconds: number) => {
    const months = Math.round(periodInSeconds / (60 * 60 * 24 * 30));
    return periodInMonthsToPlanData[months];
};

export const addressToCoinDetails: {
    [key: string]: any;
} = {
    "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6": {
        id: "wrapped-bitcoin",
        symbol: "wbtc",
        name: "Wrapped Bitcoin",
    },
    "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619": {
        id: "weth",
        symbol: "weth",
        name: "WETH",
    },
    "0x22a31bD4cB694433B6de19e0aCC2899E553e9481": {
        id: "mmfinance",
        symbol: "mmf",
        name: "MMFinance",
    },
    "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270": {
        id: "wmatic",
        symbol: "wmatic",
        name: "Wrapped Matic",
    },
};
