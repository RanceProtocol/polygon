import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppProviders from "../AppProviders";
import Layout from "../Components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppProviders>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AppProviders>
    );
}

export default MyApp;
