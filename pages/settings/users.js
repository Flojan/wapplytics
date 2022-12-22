import { Fragment, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Loading from "../../components/basics/Loading";
import DataContext from "../../contexts/DataContext";
import { createUser } from "../../utils/requests";
import Head from "next/head";
import ListItem from "../../components/basics/ListItem";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../../components/basics/PrimaryButton";
import InputField from "../../components/basics/InputField";
import Checkbox from "../../components/basics/Checkbox";

/** @param {import('next').InferGetStaticPropsType<typeof getStaticProps> } props */
export function Users(props) {
  const { status, data } = useSession();
  const [users, setUsers] = useState([]);
  const { t } = useTranslation("common");
  const [user, setUser] = useState({ username: "", password: "", admin: false });
  const { dataCtx, isLoading } = useContext(DataContext);

  const handleAddUser = async (e) => {
    e.preventDefault();
    await createUser({
      username: user.username,
      password: user.password,
      admin: user.admin,
    });
    dataCtx.update();
  };

  useEffect(() => {
    if (!isLoading) setUsers(dataCtx.users.data);
  }, [isLoading, dataCtx.users.data]);

  if (isLoading) return <Loading />;
  if (status === "authenticated" && !data.user.admin) return <div className="h-screen">Not authorized</div>;
  if (status === "authenticated" && data.user.admin && !isLoading) {
    return (
      <div className="min-h-screen">
        <Head></Head>
        <main className="p-10 xl:p-20">
          <h1 className="text-7xl font-bold">{t("navigation.user_manage")}</h1>
          <div className="items-center grid grid-flow-row-dense grid-cols-3 h-10 mt-6 font-questa-bold text-lg">
            <div>
              <span>{t("login.username")}</span>
            </div>
            <div>
              <span>{t("settings.admin")}</span>
            </div>
            <div></div>
          </div>
          {users.map((user) => (
            <Fragment key={user.id}>
              <ListItem type="user" {...user} />
            </Fragment>
          ))}
          <form className="mt-8 space-y-6" onSubmit={handleAddUser} action="#" method="POST">
            <div className="space-y-2">
              <InputField
                value={user.username}
                className="w-60"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                type="username"
                required
                placeholder={t("login.username")}
              />
              <InputField
                value={user.password}
                className="w-60"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                required
                placeholder={t("login.password")}
              />
              <Checkbox
                label={t("settings.admin")}
                checked={user.admin}
                onChange={(e) => setUser({ ...user, admin: e.target.checked })}
                type="checkbox"
              />
              <PrimaryButton value={t("settings.create-user")}></PrimaryButton>
            </div>
          </form>
        </main>
      </div>
    );
  } else {
    return <div className="h-screen">Not allowed.</div>;
  }
}

export default Users;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
