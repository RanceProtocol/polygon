import { NextApiRequest, NextApiResponse } from "next";
import { createUserReferralInfo } from "../../../../server/userReferralInfo/domain/useCases/createUserReferralInfo";
import DBConnection from "../../../../server/userReferralInfo/infrastructure/dataSource/mongodb/DBConnection";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return res.status(404);

    const { message, signature, address } = req.body;

    try {
        const referralInfo = createUserReferralInfo.execute(
            message,
            signature,
            address
        );
        return res.status(200).json(referralInfo);
    } catch (error: any) {
        res.status(error.status || 500).json(error.message);
    }
};

export default DBConnection(handler);
