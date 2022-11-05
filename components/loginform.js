import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Loginform() {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      username: userInfo.username,
      password: userInfo.password,
      // redirect: false,
      callbackUrl: "/",
    });
  };

  return (
    <div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-black dark:text-white">Wapplytics</h2>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit} action="#" method="POST">
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <input
              value={userInfo.username}
              onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
              id="username"
              name="username"
              type="username"
              autoComplete="username"
              required
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-black placeholder-gray-400 focus:z-10 focus:border-gray focus:outline-none focus:ring-gray sm:text-sm"
              placeholder="Benutzername"
            />
          </div>
          <div>
            <input
              value={userInfo.password}
              onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-black placeholder-gray-400 focus:z-10 focus:border-gray focus:outline-none focus:ring-gray sm:text-sm"
              placeholder="Passwort"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-white bg-black py-2 px-4 text-sm font-medium text-white hover:bg-gray focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2"
          >
            Anmelden
          </button>
        </div>
      </form>
    </div>
  );
}
