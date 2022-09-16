import Image from "next/image";
import { FC } from "react";
import styles from "./styles.module.css";

interface IProp {
    rewardBalances: string[];
    referralCount: number;
}

const ReferralsSummary: FC<IProp> = ({ rewardBalances, referralCount }) => {
    return (
        <div className={styles.root}>
            <p className={styles.available__balance__text}>Available balance</p>
            <div className={styles.reward__balances}>
                {rewardBalances.map((balance: string, index: number) => (
                    <p key={index} className={styles.balance}>
                        {balance}
                    </p>
                ))}
            </div>
            <p className={styles.referrals__count}>
                - {referralCount} referrals -
            </p>

            <button className={styles.withdraw__btn}>Withdraw commision</button>
        </div>
    );
};

export default ReferralsSummary;
