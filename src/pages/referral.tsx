import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/referral.module.css";
import { Fragment, useEffect, useState } from "react";
import GenerateReferralLink from "../Components/GenerateReferralLink";
import NoCommisionsYet from "../Components/NoCommissionsYet";
import ReferralLink from "../Components/ReferralLink";
import ReferralsSummary from "../Components/ReferralsSummary";
import ReferralRecordTable from "../Components/ReferralRecordTable";
import { useWeb3React } from "@web3-react/core";
import ReferralBanner from "../Components/ReferralBanner";
import { useReferralViewModel } from "../modules/referral/controllers/referralController";
import { referralState } from "../modules/referral/infrastructure/redux/state";

const Referral: NextPage = () => {
    const { account, library, connector } = useWeb3React();

    const {
        loadingReferralRecord,
        loadingreferralLink,
        referralRecord,
        referralLink,
    } = referralState();

    const { initialize, genarateReferralLink, copyReferralLink } =
        useReferralViewModel({
            address: account,
            provider: library,
            connector,
        });

    useEffect(() => {
        (async () => {
            initialize();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account]);

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
                    ) : referralLink ? (
                        <>
                            <ReferralBanner />
                            <ReferralLink
                                refLink={referralLink}
                                copyReferralLinkHandler={copyReferralLink}
                            />
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
                        loadingreferralLink === false && (
                            <>
                                <ReferralBanner />
                                {/* this div is a workaround so that the component below to be the third grid iten */}
                                <div></div>
                                <GenerateReferralLink
                                    generateLinkHandler={genarateReferralLink}
                                />
                            </>
                        )
                    )}
                </main>
            </div>
        </Fragment>
    );
};

export default Referral;
