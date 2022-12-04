import Head from "next/head";
import { useSession } from "next-auth/react";
import { generateUUID } from "../utils/id";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

/** @param {import('next').InferGetStaticPropsType<typeof getStaticProps> } props */
export default function Home(props) {
  const { t } = useTranslation("common");
  const { status } = useSession();
  console.log(generateUUID("Catwoman"));

  if (status === "authenticated") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Head></Head>
        <main>
          <h1 className="text-7xl font-bold underline">{t("test")}</h1>
        </main>
      </div>
    );
  }
  return <div>Loading...</div>;
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
