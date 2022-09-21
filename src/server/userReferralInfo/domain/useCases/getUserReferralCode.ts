import { userReferralInfoRepository } from "../../infrastructure/reposositories/userReferralInfoRepository";
import { IUserReferralInfoRepository } from "../interfaces/repositories/userReferralInfoRepository";

class GetUserReferralCode {
    private userReferralInfoRepository: IUserReferralInfoRepository;
    constructor(userReferralInfoRepository: IUserReferralInfoRepository) {
        this.userReferralInfoRepository = userReferralInfoRepository;
    }

    async execute(address: string) {
        try {
            // get the record with the address
        } catch (error) {
            throw error;
        }
    }
}

export const getUserReferralAddress = new GetUserReferralCode(
    userReferralInfoRepository
);
