import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppProviders from "../AppProviders";
import Layout from "../Components/Layout";
import { useEffect } from "react";
import axios from "axios";

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        axios
            .get("/api/referral/code", {
                data: JSON.stringify({
                    address: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
                }),
            })
            .then((res) => console.log("response: ", res));
    }, []);

    return (
        <AppProviders>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AppProviders>
    );
}

export default MyApp;
