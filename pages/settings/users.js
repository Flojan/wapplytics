import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Loading from "../../components/basics/Loading";
import DataContext from "../../contexts/DataContext";
import { createUser } from "../../utils/requests";

/** @param {import('next').InferGetStaticPropsType<typeof getStaticProps> } props */
export function Users(props) {
  const { status, data } = useSession();
  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState(false);

  // const { dataCtx, isLoading } = useContext(DataContext);
  const { dataCtx, isLoading } = useContext(DataContext);

  const addUser = async (props) => {
    console.log("ADD USER", await createUser(props));
    dataCtx.update();

    // if (res.ok) setToggle(toggle ? false : true);
  };

  if (isLoading) return <Loading />;
  if (status === "authenticated" && !data.user.admin) return <div className="h-screen">Not authorized</div>;
  if (status === "authenticated" && data.user.admin && !isLoading) {
    return (
      <div className="flex">
        <button onClick={() => addUser({ username: "florian", password: "test", admin: true })}>Create User</button>
        <div className="w-full h-screen max-w-md space-y-8">
          <ul>
            {dataCtx.users.data.map((user) => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    return <div className="h-screen">Not allowed.</div>;
  }
}

export default Users;

// https://www.prisma.io/nextjs
// https://www.prisma.io/client

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
