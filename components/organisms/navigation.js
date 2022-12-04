import { Fragment, useContext } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Menu, Transition, Disclosure } from "@headlessui/react";
import ThemeContext from "../../utils/context";
import { useRouter } from "next/router";

function Navigation() {
  const ctx = useContext(ThemeContext);
  const { data } = useSession();
  const router = useRouter();

  return (
    <div
      className="bg-white dark:bg-black text-black dark:text-white w-60 border-r-2 h-screen fixed flex flex-col justify-between"
      id="sidebar"
    >
      <div className="w-full">
        <div className="flex justify-center pb-6 pt-6" id="sidebar-header">
          <Link href="/">
            <h1 className="text-3xl">Wapplytics</h1>
          </Link>
        </div>
        <nav className="pt-6 pl-4 ">
          <ul className="relative text-lg space-y-4">
            <li className="">
              <Link href="/" className="flex space-x-4 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                  />
                </svg>
                <span>Übersicht</span>
              </Link>
            </li>
            <li className="">
              <Disclosure>
                <Disclosure.Button className="flex space-x-4 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path
                      fillRule="evenodd"
                      d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Websites</span>
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel as="ul">
                    <li className="">
                      <Link href="#website1" className="flex items-center text-xs py-4 pl-12 h-6 overflow-hidden rounded">
                        Website 1
                      </Link>
                    </li>
                    <li className="">
                      <Link href="#website2" className="flex items-center text-xs py-4 pl-12 h-6 overflow-hidden rounded">
                        Website 2
                      </Link>
                    </li>
                  </Disclosure.Panel>
                </Transition>
              </Disclosure>
            </li>
            <li className="">
              <Disclosure>
                <Disclosure.Button className="flex space-x-4 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                    />
                  </svg>
                  <span className="">Einstellungen</span>
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel as="ul">
                    <li className="">
                      <Link href="#websites" className="flex items-center text-xs py-4 pl-12 h-6 overflow-hidden rounded">
                        Websites
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/settings/users" className="flex items-center text-xs py-4 pl-12 h-6 overflow-hidden rounded">
                        Nutzerverwaltung
                      </Link>
                    </li>
                    <li className="">
                      <Link href="#profile" className="flex items-center text-xs py-4 pl-12 h-6 overflow-hidden rounded">
                        Profil
                      </Link>
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
          <button onClick={ctx.toggleTheme} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
              />
            </svg>
          </button>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
                  />
                </svg>
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
                      <Link legacyBehavior={false} href="/" locale={(router.locale = "de")}>
                        <button className={(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
                          deutsch
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link legacyBehavior={false} href="/" locale={(router.locale = "en")}>
                        <button className={(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
                          englisch
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <button onClick={() => signOut({ redirect: false, callbackUrl: "/login" })} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </button>
        </div>

        <Link href="#profile" className="">
          <div className="flex items-center pl-4 space-x-4 text-lg h-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            <div className="flex items-center">{data.user.username}</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
