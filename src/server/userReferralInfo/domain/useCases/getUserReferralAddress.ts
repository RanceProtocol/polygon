import { userReferralInfoRepository } from "../../infrastructure/reposositories/userReferralInfoRepository";
import { IUserReferralInfoRepository } from "../interfaces/repositories/userReferralInfoRepository";

class GetUserReferralAddress {
    private userReferralInfoRepository: IUserReferralInfoRepository;
    constructor(userReferralInfoRepository: IUserReferralInfoRepository) {
        this.userReferralInfoRepository = userReferralInfoRepository;
    }

    async execute(code: string) {
        try {
            // get the record with the code
        } catch (error) {
            throw error;
        }
    }
}

export const getUserReferralAddress = new GetUserReferralAddress(
    userReferralInfoRepository
);
