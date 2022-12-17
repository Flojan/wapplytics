import { useEffect } from "react";
import Bar from "../molecule/charts/Bar";
import Compact from "../molecule/charts/Compact";
import List from "../molecule/charts/List";
import Map from "../molecule/charts/Map";

const Tile = (props) => {
  const multidata = ["view"];
  const compact = ["view", "unique-user", "avg-visit-time", "bounce-rate"];
  const bigchart = ["country"];
  const smalltext = ["path", "language", "country", "browser", "os", "device", "screen", "referrer"];
  const smallchart = ["browser", "os", "device"];

  console.log(props.website_id);
  if (props.tile === "multidata" && multidata.includes(props.indicator)) {
    return <Bar {...props} />;
  } else if (props.tile === "compact" && compact.includes(props.indicator)) {
    return <Compact {...props} />;
  } else if (props.tile === "smalltext" && smalltext.includes(props.indicator)) {
    return <List {...props} />;
  } else if (props.tile === "bigchart" && bigchart.includes(props.indicator)) {
    return <Map {...props} />;
  }
  return (
    <>
      <h1>Universal Kachel</h1>
    </>
  );
};

export default Tile;
