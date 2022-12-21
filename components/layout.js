import { Fragment, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Navigation from "./Navigation";

function Layout(props) {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status]);

  return (
    <Fragment>
      <Head>
        <title>Wapplytics – Website Analyse</title>
      </Head>
      {status === "authenticated" && (
        <aside className="font-questa-medium">
          <Navigation />
        </aside>
      )}
      <main
        className={
          `${status === "authenticated" ? "ml-60 " : "ml-0 "}` + "bg-white dark:bg-black text-black dark:text-white font-questa-regular"
        }
      >
        {props.children}
      </main>
    </Fragment>
  );
}

export default Layout;
