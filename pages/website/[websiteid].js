import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DropdownList from "../../components/basics/DropdownList";
import Loading from "../../components/basics/Loading";
import Subtitle from "../../components/basics/Subtitle";
import Tile from "../../components/Tile";
import DataContext from "../../contexts/DataContext";
import nextI18nextConfig from "../../next-i18next.config";

const Website = (props) => {
  const router = useRouter();
  const { status, data } = useSession();
  const { t } = useTranslation("common");
  const { dataCtx, isLoading } = useContext(DataContext);
  const [website, setWebsite] = useState();
  const [routerQuery, setRouterQuery] = useState(router.query.websiteid);
  useEffect(() => {
    setRouterQuery(router.query.websiteid);
    if (!isLoading && status === "authenticated") {
      setWebsite(dataCtx.websites.data.find((website) => website.id === parseInt(routerQuery)));
    }
  }, [dataCtx, isLoading, routerQuery, router.query.websiteid, data, status]);

  if (isLoading) return <Loading />;
  if (status === "authenticated" && website !== undefined) {
    return (
      <div className="min-h-screen">
        <Head></Head>
        <main className="p-10 xl:p-20">
          <h1 className="text-7xl font-bold">{t("navigation.detailview")}</h1>
          <Subtitle className="text-4xl font-normal">{website.website_name}</Subtitle>
          <div className="w-full flex justify-between items-center">
            <Tile website_id={routerQuery} user_id={data.user.id} tile="livedata" indicator="live-user" />
            <DropdownList />
          </div>
          <Tile website_id={routerQuery} user_id={data.user.id} tile="multidata" indicator="view" i18n="true" />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <Tile website_id={routerQuery} user_id={data.user.id} tile="smalltext" indicator="path" />
            <Tile website_id={routerQuery} user_id={data.user.id} tile="smalltext" indicator="language" />
            <Tile website_id={routerQuery} user_id={data.user.id} tile="smalltext" indicator="country" i18n="true" />
            <Tile website_id={routerQuery} user_id={data.user.id} tile="smalltext" indicator="browser" />
            <Tile website_id={routerQuery} user_id={data.user.id} tile="smalltext" indicator="os" />
            <Tile website_id={routerQuery} user_id={data.user.id} tile="smalltext" indicator="device" />
            <Tile website_id={routerQuery} user_id={data.user.id} tile="smalltext" indicator="screen" />
            <Tile website_id={routerQuery} user_id={data.user.id} tile="smalltext" indicator="referrer" />
            <Tile website_id={routerQuery} user_id={data.user.id} tile="smallchart" indicator="browser" />
            <Tile website_id={routerQuery} user_id={data.user.id} tile="smallchart" indicator="os" />
          </div>
          <Tile website_id={routerQuery} user_id={data.user.id} tile="bigchart" indicator="country" i18n="true" />
        </main>
      </div>
    );
  }
};

export default Website;

// const getWebsiteIDs = async () => {
//   const URL = process.env.NEXTAUTH_URL;
//   const res = await fetch(`${URL}/api/website/`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const websites = await res.json();

//   const ids = websites.data.map((website) => website.id);
//   const idwithlocale = ids.map((id) => nextI18nextConfig.i18n.locales.map((locale) => ({ params: { websiteid: id.toString() }, locale })));
//   return idwithlocale;
// };

// export const getStaticPaths = async ({ locale }) => {
//   // const params = await getWebsiteIDs();
//   return {
//     // paths: params.flat(),
//     paths: [],
//     fallback: false,
//   };
// };

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
