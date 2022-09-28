import { BigNumber, utils } from "ethers";
import { FC, useEffect, useState } from "react";
import { IReferralReward } from "../../modules/referral/domain/entities";
import styles from "./styles.module.css";

interface IProp {
    referralRecord: IReferralReward[];
}

const ReferralsSummary: FC<IProp> = ({ referralRecord }) => {
    const [unclaimedBalances, setUnclaimedBalances] = useState<{
        [key: string]: number;
    }>({});

    useEffect(() => {
        if (referralRecord.length === 0) return setUnclaimedBalances({});
        const tokens = referralRecord.map((record) => record.rewardTokenSymbol);
        const tokensTotalAmount: number[] = new Array(tokens.length).fill(0.0);
        for (let i = 0; i < tokens.length; i++) {
            referralRecord.forEach((record) => {
                if (record.rewardTokenSymbol === tokens[i] && !record.claimed)
                    tokensTotalAmount[i] += Number(
                        utils.formatUnits(
                            record.rewardAmount,
                            record.rewardTokenDecimals
                        )
                    );
            });
        }
        const balancesObj: { [key: string]: number } = {};
        tokens.forEach((token, index) => {
            balancesObj[token] = tokensTotalAmount[index];
        });
        setUnclaimedBalances(balancesObj);
    }, [referralRecord]);

    return (
        <div className={styles.root}>
            <p className={styles.available__balance__text}>Available balance</p>
            <div className={styles.reward__balances}>
                {!!Object.keys(unclaimedBalances).length &&
                    Object.keys(unclaimedBalances).map((tokenSymbol, index) => (
                        <p key={index} className={styles.balance}>
                            {`${unclaimedBalances[tokenSymbol]} ${tokenSymbol}`}
                        </p>
                    ))}
            </div>
            <p className={styles.referrals__count}>
                - {referralRecord.length} referrals -
            </p>

            <button className={styles.withdraw__btn}>Withdraw commision</button>
        </div>
    );
};

export default ReferralsSummary;
