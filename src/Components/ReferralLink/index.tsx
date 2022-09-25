import { FC } from "react";
import styles from "./styles.module.css";
import { AiOutlineLink, AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import clsx from "clsx";
import { TwitterShareButton } from "react-share";

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
                    <TwitterShareButton
                        title="Stabilise coins on Rance Protocol at your desired price with up to 2 years Insurance protection by using this link"
                        url={refLink}
                        hashtags={[
                            "DeFi",
                            "crypto",
                            "blockchain",
                            "cryptocurrency",
                        ]}
                    >
                        <AiOutlineTwitter />
                    </TwitterShareButton>
                </button>
                <button className={styles.icon__btn}>
                    <FaDiscord />
                </button>
            </div>
        </div>
    );
};

export default ReferralLink;
