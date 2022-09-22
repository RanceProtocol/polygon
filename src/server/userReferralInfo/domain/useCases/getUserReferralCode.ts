import { userReferralInfoRepository } from "../../infrastructure/reposositories/userReferralInfoRepository";
import { IUserReferralInfoRepository } from "../interfaces/repositories/userReferralInfoRepository";

class GetUserReferralCode {
    private userReferralInfoRepository: IUserReferralInfoRepository;
    constructor(userReferralInfoRepository: IUserReferralInfoRepository) {
        this.userReferralInfoRepository = userReferralInfoRepository;
    }

    async execute(address: string): Promise<string> {
        try {
            const referralInfo = await this.userReferralInfoRepository.get({
                address: address,
            });
            return referralInfo.code;
        } catch (error) {
            throw error;
        }
    }
}

export const getUserReferralAddress = new GetUserReferralCode(
    userReferralInfoRepository
);
