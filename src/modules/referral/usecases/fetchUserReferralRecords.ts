import { BigNumber } from "ethers";
import { RanceProtocol } from "../../../typechain";
// import { getMulticall } from "../../../utils/multicall";
import { IReferralReward } from "../domain/entities";

export const fetchUserReferralRecords = async (
    contract: RanceProtocol,
    userAddress: string
): Promise<IReferralReward[]> => {
    // const {multicall} = getMulticall(contract.provider)
    const refLength = await contract.getUserReferralsLength(userAddress);
    if (refLength.toNumber() === 0) return [];

    const refRecord = await contract.getAllUserReferrals(
        userAddress,
        0,
        refLength
    );

    const formatedRefRecord = refRecord.map(
        (record: RanceProtocol.ReferralRewardStructOutput, index: number) => {
            return {
                id: record.id,
                rewardAmount: record.rewardAmount,
                rewardToken: record.token,
                date: formatRewardDate(record.timestamp),
                user: record.user,
                owner: record.referrer,
                claimed: record.claimed,
            };
        }
    );

    return formatedRefRecord;
};

const formatRewardDate = (timestamp: BigNumber): string => {
    const dateArray = new Date(timestamp.toNumber() * 1000).toString();
    return `${dateArray[1]} ${dateArray[2]} ${dateArray[3]}`;
};
