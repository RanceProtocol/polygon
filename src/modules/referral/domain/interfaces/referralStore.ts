import { IReferralReward } from "../entities";

interface IReferralStore {
    loadingReferralRecord: boolean;
    loadingreferralLink: boolean;
    referralRecord: IReferralReward[];
    referralLink: string | null;
    referrerAddress: string | null;
}

export default IReferralStore;
