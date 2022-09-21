import { userReferralInfoRepository } from "../../infrastructure/reposositories/userReferralInfoRepository";
import { IUserReferralInfoRepository } from "../interfaces/repositories/userReferralInfoRepository";

class CreateUserReferralInfo {
    private userReferralInfoRepository: IUserReferralInfoRepository;
    constructor(userReferralInfoRepository: IUserReferralInfoRepository) {
        this.userReferralInfoRepository = userReferralInfoRepository;
    }

    async execute(message: string, signature: string, address: string) {
        try {
            // verify  the 'address' is the signer of the 'signature'
            // generate a code
            // create save in the db through the repository
        } catch (error) {
            throw error;
        }
    }
}

export const createUserReferralInfo = new CreateUserReferralInfo(
    userReferralInfoRepository
);
