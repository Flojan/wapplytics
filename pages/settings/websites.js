import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext, useEffect, useState } from "react";
import Loading from "../../components/molecule/Loading";
import DataContext from "../../contexts/DataContext";

/** @param {import('next').InferGetStaticPropsType<typeof getStaticProps> } props */
export function Websites(props) {
  const { dataCtx, isLoading } = useContext(DataContext);
  const [websites, setWebsites] = useState([]);

  // console.log(data.user.username);
  useEffect(() => {
    if (!isLoading) setWebsites(dataCtx.websites.data);
  }, [isLoading, dataCtx.websites.data]);

  console.log("DATA", websites);
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
