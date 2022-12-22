import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { Fragment, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loading from "../../components/basics/Loading";
import PrimaryButton from "../../components/basics/PrimaryButton";
import DataContext from "../../contexts/DataContext";
import { Listbox, Transition } from "@headlessui/react";
import { updateUser } from "../../utils/requests";
import Subtitle from "../../components/basics/Subtitle";

const Profile = () => {
  const { dataCtx, isLoading } = useContext(DataContext);
  const { status, data } = useSession();
  const [user, setUser] = useState({ timezone: "" });
  const { t } = useTranslation("common");

  const timezones = [
    { id: 0, name: t("settings.select-timezone"), unavailable: true },
    { id: 1, name: "Europe/Berlin" },
    { id: 2, name: "Europe/London" },
    { id: 3, name: "America/New_York" },
    { id: 4, name: "America/Los_Angeles" },
    { id: 5, name: "Australia/Sydney" },
    { id: 6, name: "utc" },
  ];
  const [timezone, setTimezone] = useState(timezones[0]);

  const handleEditUser = async (e) => {
    e.preventDefault();
    if (timezone.name !== timezones[0].name) {
      await updateUser({
        username: user.username,
        timezone: timezone.name,
      });
      dataCtx.update();
    } else {
      console.log("invalid timezone");
    }
  };

  useEffect(() => {
    if (!isLoading && status === "authenticated") {
      setUser(dataCtx.users.data.find((user) => user.username === data.user.username));
    }
  }, [isLoading, status, dataCtx.users.data, data]);

  if (isLoading) return <Loading />;
  return (
    <div className="min-h-screen">
      <Head></Head>
      <main className="p-10 xl:p-20">
        <h1 className="text-7xl font-bold">{t("navigation.profile")}</h1>
        <Subtitle>{user.username}</Subtitle>
        <form className="mt-8 space-y-6" onSubmit={handleEditUser} action="#" method="POST">
          <div className="space-y-2">
            <Listbox value={timezone} onChange={setTimezone}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-60 cursor-default border dark:border-mint rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
                  <span className="block truncate">{timezone.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
                </Listbox.Button>
                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <Listbox.Options className="absolute mt-1 max-h-60 w-60 z-10 dark:bg-black bg-white border dark:border-mint overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {timezones.map((item, itemIdx) => (
                      <Listbox.Option
                        key={itemIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "dark:bg-neutral-900 bg-neutral-200 dark:text-mint text-black" : "dark:text-white text-black"
                          }`
                        }
                        value={item}
                        disabled={item.unavailable}
                      >
                        {({ timezone }) => (
                          <>
                            <span className={`block truncate ${timezone ? "font-medium" : "font-normal"}`}>{item.name}</span>
                            {timezone ? <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span> : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            <PrimaryButton value={t("settings.update-profile")}></PrimaryButton>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Profile;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
