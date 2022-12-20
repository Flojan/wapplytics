import Head from "next/head";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import Loading from "../components/molecule/Loading";
import { Fragment, useContext, useEffect, useState } from "react";
import Tile from "../components/organisms/Tile";
import DataContext from "../contexts/DataContext";

/** @param {import('next').InferGetStaticPropsType<typeof getStaticProps> } props */
export default function Home(props) {
  const { t } = useTranslation("common");
  const { status, data } = useSession();
  const [websites, setWebsites] = useState([]);
  const { dataCtx, isLoading } = useContext(DataContext);

  useEffect(() => {
    if (!isLoading) setWebsites(dataCtx.websites.data.map((website) => website));
  }, [isLoading, dataCtx.websites.data]);

  if (isLoading) return <Loading />;
  if (status === "authenticated") {
    return (
      <div className="min-h-screen">
        <Head></Head>
        <main className="p-10 xl:p-20">
          <h1 className="text-7xl font-bold">{t("navigation.overview")}</h1>
          {websites.map((website) => (
            <Fragment key={website.id}>
              <h2 className="text-4xl font-normal mt-8">{website.website_name}</h2>
              <Tile website_id={website.id} user_id={data.user.id} tile="multidata" indicator="view" i18n="true" />
            </Fragment>
          ))}
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
