import { signIn } from "next-auth/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import FullWidthButton from "./basics/FullWidthButton";
import InputField from "./basics/InputField";
import TitleH2 from "./basics/TitleH2";

const LoginForm = (props) => {
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
  const { t } = useTranslation("common");

  return (
    <>
      <TitleH2>Wapplytics</TitleH2>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit} action="#" method="POST">
        <div className="space-y-2 shadow-sm">
          <InputField
            className="w-full"
            value={userInfo.username}
            onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
            type="username"
            required
            placeholder={t("login.username")}
          />
          <InputField
            className="w-full"
            value={userInfo.password}
            onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
            type="password"
            required
            placeholder={t("login.password")}
          />
        </div>
        <div>
          <FullWidthButton value={t("login.signin")} />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
