import Head from "next/head";
import { useSession } from "next-auth/react";
import { generateUUID } from "../utils/id";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import Loading from "../components/molecule/Loading";
import Chart from "../components/molecule/Chart";

/** @param {import('next').InferGetStaticPropsType<typeof getStaticProps> } props */
export default function Home(props) {
  const { t } = useTranslation("common");
  const { status } = useSession();
  console.log(generateUUID("Catwoman"));

  if (status === "authenticated") {
    return (
      <div className="min-h-screen">
        <Head></Head>
        <main className="p-10">
          <h1 className="text-7xl font-bold underline">{t("navigation.overview")}</h1>
          <Chart />
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
