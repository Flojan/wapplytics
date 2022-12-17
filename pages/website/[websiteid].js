import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loading from "../../components/molecule/Loading";
import Tile from "../../components/organisms/Tile";
import DataContext from "../../contexts/DataContext";
import nextI18nextConfig from "../../next-i18next.config";

const Website = (props) => {
  console.log("🚀 ~ file: [websiteid].js:28 ~ Website ~ props", props);
  const router = useRouter();
  const { status } = useSession();
  const { t } = useTranslation("common");
  const { dataCtx, isLoading } = useContext(DataContext);
  const [website, setWebsite] = useState();
  const [routerQuery, setRouterQuery] = useState(router.query.websiteid);
  useEffect(() => {
    console.log("🚀 ~ file: [websiteid].js:22 ~ Website ~ routerQuery", routerQuery);
    setRouterQuery(router.query.websiteid);
    if (!isLoading) setWebsite(dataCtx.websites.data.find((website) => website.id === parseInt(routerQuery)));
  }, [dataCtx.websites.data, isLoading, routerQuery, router.query.websiteid]);

  if (isLoading) return <Loading />;
  if (status === "authenticated" && website !== undefined) {
    return (
      <div className="min-h-screen">
        <Head></Head>
        <main className="p-10">
          <h1 className="text-7xl font-bold">{t("navigation.detailview")}</h1>
          <h2 className="text-4xl font-normal">{website.website_name}</h2>
          <Tile website_id={routerQuery} tile="multidata" indicator="view" i18n="true" />
          <Tile website_id={routerQuery} tile="smalltext" indicator="path" />
          <Tile website_id={routerQuery} tile="smalltext" indicator="language" />
          <Tile website_id={routerQuery} tile="smalltext" indicator="country" />
          <Tile website_id={routerQuery} tile="smalltext" indicator="browser" />
          <Tile website_id={routerQuery} tile="smalltext" indicator="os" />
          <Tile website_id={routerQuery} tile="smalltext" indicator="device" />
          <Tile website_id={routerQuery} tile="smalltext" indicator="screen" />
          <Tile website_id={routerQuery} tile="smalltext" indicator="referrer" />
          <Tile website_id={routerQuery} tile="compact" indicator="view" />
          <Tile website_id={routerQuery} tile="compact" indicator="unique-user" />
          <Tile website_id={routerQuery} tile="compact" indicator="bounce-rate" />
          <Tile website_id={routerQuery} tile="compact" indicator="avg-visit-time" />
          <Tile website_id={routerQuery} tile="bigchart" indicator="country" />
        </main>
      </div>
    );
  }
};

export default Website;

const getWebsiteIDs = async () => {
  const URL = process.env.NEXTAUTH_URL;
  const res = await fetch(`${URL}/api/website/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const websites = await res.json();

  const ids = websites.data.map((website) => website.id);
  const idwithlocale = ids.map((id) => nextI18nextConfig.i18n.locales.map((locale) => ({ params: { websiteid: id.toString() }, locale })));
  return idwithlocale;
};

export const getStaticPaths = async ({ locale }) => {
  const params = await getWebsiteIDs();
  return {
    paths: params.flat(),
    fallback: false,
  };
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
