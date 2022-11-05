import { useSession } from "next-auth/react";
import Head from "next/head";
import { Fragment } from "react";
import Navigation from "./navigation";

function Layout(props) {
  const { status } = useSession();
  console.log(status);
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
