import { FC } from "react";
import styles from "./styles.module.css";
import { AiOutlineLink, AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import clsx from "clsx";

interface IProp {
    refLink: string;
    copyReferralLinkHandler: (link: string) => void;
}

const ReferralLink: FC<IProp> = ({ refLink, copyReferralLinkHandler }) => {
    return (
        <div className={styles.root}>
            <p className={styles.ref__link__text}>
                Copy link or share via socials
            </p>
            <input
                type="url"
                value={refLink}
                className={styles.ref__link__input}
                readOnly
            />
            <div className={styles.icons__btn__container}>
                <button
                    className={clsx(styles.icon__btn, styles.link__icon__btn)}
                    onClick={() => copyReferralLinkHandler(refLink)}
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
