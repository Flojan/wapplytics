import "../styles/globals.css";
import "@tremor/react/dist/esm/tremor.css";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout";
import { ThemeContextProvider } from "../contexts/ThemeContext";
import { appWithTranslation } from "next-i18next";
import { DataContextProvider } from "../contexts/DataContext";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <DataContextProvider>
        <SessionProvider session={pageProps.session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </DataContextProvider>
    </ThemeContextProvider>
  );
}

export default appWithTranslation(MyApp);
