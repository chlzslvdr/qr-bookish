import { generateNextSeo } from "next-seo/pages";
import SEOConfig from "../../next-seo.config";
import Head from "next/head";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="icon"
          href="https://chlzslvdr.sirv.com/bookish/bookish.png"
          type="image/png"
        />
        {generateNextSeo(SEOConfig)}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
