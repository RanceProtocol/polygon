import { userReferralInfoRepository } from "../../infrastructure/reposositories/userReferralInfoRepository";
import { IUserReferralInfoRepository } from "../interfaces/repositories/userReferralInfoRepository";

class GetUserReferralAddress {
    private userReferralInfoRepository: IUserReferralInfoRepository;
    constructor(userReferralInfoRepository: IUserReferralInfoRepository) {
        this.userReferralInfoRepository = userReferralInfoRepository;
    }

    async execute(code: string): Promise<string> {
        try {
            const referralInfo = await this.userReferralInfoRepository.get({
                code: code,
            });
            return referralInfo.address;
        } catch (error) {
            throw error;
        }
    }
}

export const getUserReferralAddress = new GetUserReferralAddress(
    userReferralInfoRepository
);
