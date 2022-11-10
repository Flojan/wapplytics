import { Fragment, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Navigation from "./navigation";

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
        <header>
          <Navigation />
        </header>
      )}
      <main className={`${status === "authenticated" ? "ml-60 " : "ml-0 "}` + "bg-white dark:bg-black text-black dark:text-white"}>
        {props.children}
      </main>
    </Fragment>
  );
}

export default Layout;
