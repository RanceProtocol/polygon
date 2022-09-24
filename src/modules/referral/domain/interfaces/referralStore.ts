import { IReferralReward } from "../entities";

interface IReferralStore {
    loadingReferralRecord: boolean;
    loadingReferralCode: boolean;
    referralRecord: IReferralReward[];
    referralCode: string | null;
}

export default IReferralStore;
