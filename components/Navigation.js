import { Fragment, useContext } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Menu, Transition, Disclosure } from "@headlessui/react";
import ThemeContext from "./../contexts/ThemeContext";
import { useRouter } from "next/router";
import Icon from "./basics/CustomIcon";
import { useTranslation } from "react-i18next";
import MenuItem from "./basics/MenuItem";
import TitleH2 from "./basics/TitleH2";
import DataContext from "./../contexts/DataContext";
import Loading from "./basics/Loading";

const Navigation = () => {
  const themeCtx = useContext(ThemeContext);
  const { dataCtx, isLoading } = useContext(DataContext);
  const { data } = useSession();
  const router = useRouter();
  const { t } = useTranslation("common");

  const onToggleLngChange = (locale) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale });
  };

  if (isLoading) return <Loading />;
  return (
    <div
      className="bg-white dark:bg-black text-black dark:text-white w-60 border-r-2 h-screen fixed flex flex-col justify-between"
      id="sidebar"
    >
      <div className="w-full">
        <div className="flex justify-center pb-6 pt-6" id="sidebar-header">
          <Link href="/">
            <TitleH2>Wapplytics</TitleH2>
          </Link>
        </div>
        <nav className="pt-6 pl-4 ">
          <ul className="relative space-y-4">
            <li className="">
              <MenuItem href="/" icon="stapel" value={t("navigation.overview")} />
            </li>
            {dataCtx.websites.data.length !== 0 && (
              <li className="">
                <Disclosure>
                  <MenuItem icon="display" value={t("navigation.websites")} />
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel as="ul">
                      {dataCtx.websites.data.map((website) => (
                        <li key={website.id}>
                          <MenuItem href={`/website/${website.id}`} value={website.website_name} />
                        </li>
                      ))}
                    </Disclosure.Panel>
                  </Transition>
                </Disclosure>
              </li>
            )}
            <li className="">
              <Disclosure>
                <MenuItem icon="settings" value={t("navigation.settings")} />
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel as="ul">
                    {data.user.admin && (
                      <>
                        <li className="">
                          <MenuItem href="/settings/websites" value={t("navigation.websites")} />
                        </li>
                        <li className="">
                          <MenuItem href="/settings/users" value={t("navigation.user_manage")} />
                        </li>
                      </>
                    )}
                    <li className="">
                      <MenuItem href="/settings/profile" value={t("navigation.profile")} />
                    </li>
                  </Disclosure.Panel>
                </Transition>
              </Disclosure>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-row w-full">
        <div className="flex pl-4 pb-4 space-x-4 border-b-2">
          <button onClick={themeCtx.toggleTheme} className="">
            <Icon name="bulb" />
          </button>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex items-center space-x-2">
                <Icon name="i18n" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute z-10 left-0 w-40 bottom-8 origin-top-right bg-white dark:bg-black divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 focus:outline-none">
                <div className="py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      // <Link legacyBehavior={false} href="/" locale={(router.locale = "de")}>
                      <button
                        onClick={() => onToggleLngChange("de")}
                        className={(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}
                      >
                        {t("languages.de")}
                      </button>
                      // </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      // <Link legacyBehavior={false} href="/" locale={(router.locale = "en")}>
                      <button
                        onClick={() => onToggleLngChange("en")}
                        className={(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}
                      >
                        {t("languages.en")}
                      </button>
                      // </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <button onClick={() => signOut({ redirect: false, callbackUrl: "/login" })} className="">
            <Icon name="logout" />
          </button>
        </div>

        <div className="flex items-center pl-4 space-x-4 text-lg h-16">
          <MenuItem href="/settings/profile" icon="user" value={data?.user?.username} />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
