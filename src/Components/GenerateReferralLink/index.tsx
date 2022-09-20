import Image from "next/image";
import { FC } from "react";
import styles from "./styles.module.css";

interface IProp {}

const GenerateReferralLink: FC<IProp> = () => {
    return (
        <div className={styles.root}>
            <div className={styles.no__ref__code__image__container}>
                <Image
                    src="/coin-on-hand.png"
                    alt="coins in the hand"
                    layout="fill"
                    className={styles.no__ref__code__image}
                />
            </div>
            <p className={styles.no__ref__code__text}>
                You do not have a referral code yet. Generate one to start
                earning commissions on referrals
            </p>
            <button className={styles.generate__link__button}>
                Generate link
            </button>
        </div>
    );
};

export default GenerateReferralLink;
