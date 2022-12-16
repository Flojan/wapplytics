import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { getWebsites } from "../../utils/requests";

/** @param {import('next').InferGetStaticPropsType<typeof getStaticProps> } props */
export function Websites(props) {
  const [data, setData] = useState([]);

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
