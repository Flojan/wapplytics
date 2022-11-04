import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "authenticated") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Head></Head>
        <main>
          <h1 className="text-7xl font-bold underline">
            <button onClick={() => signOut({ redirect: false, callbackUrl: "/login" })}>Logout!</button>
          </h1>
        </main>
      </div>
    );
  }
  return <div>Loading...</div>;
}
