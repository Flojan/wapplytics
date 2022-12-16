import { createContext, useEffect, useState } from "react";
import { getUsers, getWebsites } from "../utils/requests";

const DataContext = createContext({
  users: [],
  websites: [],
  update: () => {},
});

export function DataContextProvider(props) {
  const [users, setUsers] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    (async () => {
      setWebsites(await getWebsites());
      setUsers(await getUsers());
      setLoading(false);
    })();
  }, [toggle]);

  function updateToggle() {
    toggle ? setToggle(false) : setToggle(true);
  }

  const dataCtx = {
    users: users,
    websites: websites,
    update: updateToggle,
  };
  return <DataContext.Provider value={{ dataCtx, isLoading }}>{props.children}</DataContext.Provider>;
}

export default DataContext;
