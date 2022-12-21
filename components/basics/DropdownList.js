import { Fragment, useContext, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import DataContext from "../../contexts/DataContext";
import { useSession } from "next-auth/react";
import { updateUser } from "../../utils/requests";

const DropdownList = () => {
  const { t } = useTranslation("common");
  const timeranges = [
    { id: 1, name: t("charts.last24"), value: "24", unavailable: false },
    { id: 2, name: t("charts.today"), value: "day", unavailable: false },
    { id: 3, name: t("charts.lastweek"), value: "7", unavailable: false },
    { id: 4, name: t("charts.week"), value: "week", unavailable: false },
    { id: 5, name: t("charts.last30"), value: "30", unavailable: false },
    { id: 6, name: t("charts.month"), value: "month", unavailable: false },
    { id: 7, name: t("charts.last90"), value: "90", unavailable: false },
    { id: 8, name: t("charts.last180"), value: "180", unavailable: false },
    { id: 9, name: t("charts.year"), value: "year", unavailable: false },
  ];
  const { dataCtx, isLoading } = useContext(DataContext);
  const [timerange, setTimerange] = useState(timeranges[0]);
  const [user, setUser] = useState([]);
  const { data } = useSession();

  console.log(timeranges.find((item) => item.value === dataCtx.timerange));

  useEffect(() => {
    (async () => {
      await updateUser({ username: data.user.username, timerange: timerange.value });
    })();
    dataCtx.update();
  }, [timerange, data.user.username]);

  return (
    <div className="w-72 relative z-10">
      <Listbox value={timerange} onChange={setTimerange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{timerange.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {/* <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            /> */}
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {timeranges.map((range, rangeIdx) => (
                <Listbox.Option
                  key={rangeIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"}`
                  }
                  value={range}
                >
                  {({ timerange }) => (
                    <>
                      <span className={`block truncate ${timerange ? "font-medium" : "font-normal"}`}>{t(range.name)}</span>
                      {timerange ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default DropdownList;
