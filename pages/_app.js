import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout";
import { ThemeContextProvider } from "../utils/context";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ThemeContextProvider>
  );
}

export default MyApp;
