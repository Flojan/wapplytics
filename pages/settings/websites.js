import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { Fragment, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InputField from "../../components/basics/InputField";
import ListItem from "../../components/basics/ListItem";
import Loading from "../../components/basics/Loading";
import PrimaryButton from "../../components/basics/PrimaryButton";
import DataContext from "../../contexts/DataContext";
import { createWebsite } from "../../utils/requests";

/** @param {import('next').InferGetStaticPropsType<typeof getStaticProps> } props */
export function Websites(props) {
  const { status, data } = useSession();
  const { dataCtx, isLoading } = useContext(DataContext);
  const [websites, setWebsites] = useState([]);
  const { t } = useTranslation("common");
  const [website, setWebsite] = useState({ name: "", url: "" });

  const handleCreateWebsite = async (e) => {
    e.preventDefault();
    await createWebsite({
      website_name: website.name,
      website_url: website.url,
    });
    dataCtx.update();
  };

  useEffect(() => {
    if (!isLoading) setWebsites(dataCtx.websites.data);
  }, [isLoading, dataCtx.websites.data]);
  console.log(websites);

  if (isLoading) return <Loading />;
  if (status === "authenticated" && !data.user.admin) return <div className="h-screen">Not authorized</div>;
  if (status === "authenticated" && data.user.admin && !isLoading) {
    return (
      <div className="min-h-screen">
        <Head></Head>
        <main className="p-10 xl:p-20">
          <h1 className="text-7xl font-bold">{t("navigation.websites")}</h1>
          <div className="items-center grid grid-flow-row-dense grid-cols-3 h-10 mt-6 font-questa-bold text-lg">
            <div>
              <span>{t("settings.website-name")}</span>
            </div>
            <div>
              <span>{t("settings.website-url")}</span>
            </div>
            <div>
              {" "}
              <span>{t("settings.tracking-code")}</span>
            </div>
          </div>
          {websites.map((website) => (
            <Fragment key={website.id}>
              <ListItem type="website" {...website} />
            </Fragment>
          ))}
          <form className="mt-8 space-y-6" onSubmit={handleCreateWebsite} action="#" method="POST">
            <div className="space-y-2">
              <InputField
                id="name"
                value={website.name}
                className="w-60"
                onChange={(e) => setWebsite({ ...website, name: e.target.value })}
                type="text"
                required
                placeholder={t("settings.website-name")}
              />
              <InputField
                id="url"
                value={website.url}
                className="w-60"
                onChange={(e) => setWebsite({ ...website, url: e.target.value })}
                type="text"
                required
                placeholder={t("settings.website-url")}
              />

              <PrimaryButton value={t("settings.add-website")}></PrimaryButton>
            </div>
          </form>
        </main>
      </div>
    );
  }
}
export default Websites;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
