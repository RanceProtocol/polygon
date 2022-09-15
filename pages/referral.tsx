import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/referral.module.css";
import { Fragment } from "react";

const Referral: NextPage = () => {
    return (
        <Fragment>
            <div className={styles.container}>
                <Head>
                    <title>Rance Protocol - Referral</title>
                </Head>
                <main className={styles.main}>
                    <div className={styles.banner}>
                        <div className={styles.banner__container}>
                            <h1 className={styles.banner__header}>Referrals</h1>
                            <p className={styles.banner__text}>
                                When your direct referrals buy an insurance
                                package, you are given a % of the package fee
                                plus other indirect commisions.
                            </p>
                        </div>
                        <div className={styles.banner__image__container}>
                            <Image
                                src="/referral-banner-image.png"
                                alt="staking page banner"
                                layout="fill"
                                className={styles.banner__image}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </Fragment>
    );
};

export default Referral;
