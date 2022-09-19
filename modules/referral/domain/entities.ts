import { BigNumber } from "ethers";

export interface IReferralReward {
    id: string;
    rewardAmount: BigNumber;
    rewardToken: string;
    dateTime: string;
    user: string;
    owner: string;
    claimed: boolean;
}
