import Head from "next/head";
import { useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();

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
