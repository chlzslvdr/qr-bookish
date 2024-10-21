import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import Head from "next/head";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Head>
           <link
          rel="icon"
          href="https://chlzslvdr.sirv.com/bookish/bookish.png"
          type="image/png"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
