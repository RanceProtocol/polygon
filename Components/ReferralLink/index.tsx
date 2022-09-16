import { FC } from "react";
import styles from "./styles.module.css";
import { AiOutlineLink, AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import clsx from "clsx";

interface IProp {
    refCode: string;
}

const ReferralLink: FC<IProp> = ({ refCode }) => {
    return (
        <div className={styles.root}>
            <p className={styles.ref__link__text}>
                Copy link or share via socials
            </p>
            <input
                type="text"
                value={`https://polygon.ranceprotocol.com?ref=${refCode}`}
                className={styles.ref__link__input}
                readOnly
            />
            <div className={styles.icons__btn__container}>
                <button
                    className={clsx(styles.icon__btn, styles.link__icon__btn)}
                >
                    <AiOutlineLink />
                </button>
                <button className={styles.icon__btn}>
                    <AiOutlineTwitter />
                </button>
                <button className={styles.icon__btn}>
                    <FaDiscord />
                </button>
            </div>
        </div>
    );
};

export default ReferralLink;
