import { Children } from "react";

const TitleH2 = (props) => {
  return (
    <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-black dark:text-white font-questa-bold">{props.children}</h2>
  );
};

export default TitleH2;
