import Head from "next/head";
import { useSession } from "next-auth/react";
import { generateUUID } from "../utils/id";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import Loading from "../components/molecule/Loading";
import { useEffect, useState } from "react";
import CompactChart from "../components/molecule/charts/Compact";
import BarChart from "../components/molecule/charts/Bar";
import { i18n } from "next-i18next";
import Tile from "../components/organisms/Tile";
import List from "../components/molecule/charts/List";

/** @param {import('next').InferGetStaticPropsType<typeof getStaticProps> } props */
export default function Home(props) {
  const { t } = useTranslation("common");
  const { status } = useSession();
  const [views, setViews] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const website_id = "2";

  if (isLoading) return <Loading />;
  if (status === "authenticated") {
    return (
      <div className="min-h-screen">
        <Head></Head>
        <main className="p-10">
          <h1 className="text-7xl font-bold underline">{t("navigation.overview")}</h1>
          <Tile website_id={website_id} tile="multidata" indicator="view" i18n="true" />
          <Tile website_id={website_id} tile="smalltext" indicator="path" />
          <Tile website_id={website_id} tile="smalltext" indicator="language" />
          <Tile website_id={website_id} tile="smalltext" indicator="country" />
          <Tile website_id={website_id} tile="smalltext" indicator="browser" />
          <Tile website_id={website_id} tile="smalltext" indicator="os" />
          <Tile website_id={website_id} tile="smalltext" indicator="device" />
          <Tile website_id={website_id} tile="smalltext" indicator="screen" />
          <Tile website_id={website_id} tile="smalltext" indicator="referrer" />
          <Tile website_id={website_id} tile="compact" indicator="view" />
          <Tile website_id={website_id} tile="compact" indicator="unique-user" />
          <Tile website_id={website_id} tile="compact" indicator="bounce-rate" />
          <Tile website_id={website_id} tile="compact" indicator="avg-visit-time" />
          <Tile website_id={website_id} tile="bigchart" indicator="country" />
        </main>
      </div>
    );
  }
  return <Loading />;
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
