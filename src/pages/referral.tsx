import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/referral.module.css";
import { Fragment, useState } from "react";
import GenerateReferralLink from "../Components/GenerateReferralLink";
import NoCommisionsYet from "../Components/NoCommissionsYet";
import ReferralLink from "../Components/ReferralLink";
import ReferralsSummary from "../Components/ReferralsSummary";
import ReferralRecordTable from "../Components/ReferralRecordTable";
import { useWeb3React } from "@web3-react/core";
import ReferralBanner from "../Components/ReferralBanner";
import { referralState } from "../modules/referral/ui/redux/state";

const Referral: NextPage = () => {
    const { account } = useWeb3React();

    const {
        loadingReferralRecord,
        loadingReferralCode,
        referralRecord,
        referralCode,
    } = referralState();

    return (
        <Fragment>
            <div className={styles.container}>
                <Head>
                    <title>Rance Protocol - Referral</title>
                </Head>
                <main className={styles.main}>
                    {!account ? (
                        <>
                            <ReferralBanner />
                            {/* this div is a workaround so that the component below to be the third grid iten */}
                            <div></div>
                            <div className={styles.message}>
                                <p>Please connect your wallet</p>
                            </div>
                        </>
                    ) : referralCode ? (
                        <>
                            <ReferralBanner />
                            <ReferralLink refCode={referralCode} />
                            {!!referralRecord.length ? (
                                <ReferralRecordTable />
                            ) : (
                                <NoCommisionsYet />
                            )}
                            <ReferralsSummary
                                referralCount={0}
                                rewardBalances={["0 USDC", "0 USDT"]}
                            />
                        </>
                    ) : (
                        <>
                            <ReferralBanner />
                            {/* this div is a workaround so that the component below to be the third grid iten */}
                            <div></div>
                            <GenerateReferralLink />
                        </>
                    )}
                </main>
            </div>
        </Fragment>
    );
};

export default Referral;
