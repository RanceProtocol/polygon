import { NextApiRequest, NextApiResponse } from "next";
import { getUserReferralCode } from "../../../../server/userReferralInfo/domain/useCases/getUserReferralCode";
import DBConnection from "../../../../server/userReferralInfo/infrastructure/dataSource/mongodb/DBConnection";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") return res.status(404);

    const { address } = req.body;

    try {
        const referralCode = getUserReferralCode.execute(address);
        return res.status(200).json(referralCode);
    } catch (error: any) {
        res.status(error.status || 500).json(error.message);
    }
};

export default DBConnection(handler);
