import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext, useEffect, useState } from "react";
import Loading from "../../components/molecule/Loading";
import DataContext from "../../contexts/DataContext";

const Profile = () => {
  const { dataCtx, isLoading } = useContext(DataContext);
  const { status, data } = useSession();
  const [user, setUser] = useState([]);

  // console.log(data.user.username);
  useEffect(() => {
    if (!isLoading) setUser(dataCtx.users.data.find((user) => user.username === data.user.username));
  }, [isLoading, dataCtx.users.data, data]);

  console.log("DATA", user);
  if (isLoading) return <Loading />;
  return (
    <>
      <h1>Test</h1>
    </>
  );
};

export default Profile;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
