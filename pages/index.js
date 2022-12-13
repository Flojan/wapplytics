import Head from "next/head";
import { useSession } from "next-auth/react";
import { generateUUID } from "../utils/id";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import Loading from "../components/molecule/Loading";
import BarChart from "../components/molecule/BarChart";
import { useEffect, useState } from "react";
import CompactChart from "../components/molecule/CompactChart";

/** @param {import('next').InferGetStaticPropsType<typeof getStaticProps> } props */
export default function Home(props) {
  const { t } = useTranslation("common");
  const { status } = useSession();
  console.log(generateUUID("Catwoman"));
  const [views, setViews] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const getViews = async () => {
    const res = await fetch("api/data/2/multidata/views", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setViews(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    (async () => {
      await getViews();
    })();
  }, []);
  if (isLoading) return <Loading />;

  console.log("🚀 ~ file: index.js:42 ~ Home ~ views", views);
  // const data = {
  //   title: "Views der letzten 24 Stunden",
  //   metric: views.data,
  // };

  if (status === "authenticated") {
    return (
      <div className="min-h-screen">
        <Head></Head>
        <main className="p-10">
          <h1 className="text-7xl font-bold underline">{t("navigation.overview")}</h1>
          {/* <CompactChart data={data} /> */}
          <BarChart chartdata={views} />
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
