import { NextApiRequest, NextApiResponse } from "next";
import { getUserReferralAddress } from "../../../../server/userReferralInfo/domain/useCases/getUserReferralAddress";
import DBConnection from "../../../../server/userReferralInfo/infrastructure/dataSource/mongodb/DBConnection";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") return res.status(404);
    const { code } = req.body;

    try {
        const referralAddress = getUserReferralAddress.execute(code);
        return res.status(200).json(referralAddress);
    } catch (error: any) {
        res.status(error.status || 500).json(error.message);
    }
};

export default DBConnection(handler);
