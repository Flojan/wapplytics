import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
