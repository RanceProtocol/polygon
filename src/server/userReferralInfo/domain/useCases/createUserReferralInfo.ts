import { userReferralInfoRepository } from "../../infrastructure/reposositories/userReferralInfoRepository";
import { IUserReferralInfoRepository } from "../interfaces/repositories/userReferralInfoRepository";
import { verifySignature } from "./utils.ts/signature";
import { nanoid } from "nanoid";
import { IuserReferralInfo } from "../entities/userReferralInfo";

class CreateUserReferralInfo {
    private userReferralInfoRepository: IUserReferralInfoRepository;
    constructor(userReferralInfoRepository: IUserReferralInfoRepository) {
        this.userReferralInfoRepository = userReferralInfoRepository;
    }

    async execute(
        message: string,
        signature: string,
        address: string
    ): Promise<IuserReferralInfo> {
        try {
            // verify  the 'address' is the signer of the 'signature'
            // generate a code
            // create save in the db through the repository
            const isVerified = verifySignature({
                signature,
                message,
                signerAddress: address,
            });
            if (!isVerified) {
                const err = {
                    message: "Signature and signer do not match",
                    status: 401,
                };
                throw err;
            }
            const refCode = `RP_${nanoid(12)}`;
            const result = await this.userReferralInfoRepository.create({
                address: address.toLocaleLowerCase(),
                code: refCode,
            });
            return {
                address: result.address,
                code: result.code,
            };
        } catch (error) {
            throw error;
        }
    }
}

export const createUserReferralInfo = new CreateUserReferralInfo(
    userReferralInfoRepository
);
