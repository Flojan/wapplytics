import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { status, data } = useSession();
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  console.log(session);

  if (status === "authenticated") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Head></Head>
        <main>
          <h1 className="text-7xl font-bold underline">Startseite</h1>
        </main>
      </div>
    );
  }
  return <div>Loading...</div>;
}
