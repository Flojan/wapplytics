import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext, useEffect, useState } from "react";
import Loading from "../../components/basics/Loading";
import DataContext from "../../contexts/DataContext";

/** @param {import('next').InferGetStaticPropsType<typeof getStaticProps> } props */
export function Websites(props) {
  const { dataCtx, isLoading } = useContext(DataContext);
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    if (!isLoading) setWebsites(dataCtx.websites.data);
  }, [isLoading, dataCtx.websites.data]);

  if (isLoading) return <Loading />;

  return (
    <>
      <h1>TEST</h1>
    </>
  );
}

export default Websites;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
