import Bar from "./basics/charts/Bar";
import Number from "./basics/charts/Number";
import List from "./basics/charts/List";
import Map from "./basics/charts/Map";
import { useEffect, useState } from "react";
import Loading from "./basics/Loading";
import { getData } from "./../utils/requests";
import LiveNumber from "./basics/charts/LiveNumber";
import Pie from "./basics/charts/Pie";

const Tile = (props) => {
  const livedata = ["live-user"];
  const multidata = ["view"];
  const compact = ["view", "unique-user", "avg-visit-time", "bounce-rate"];
  const bigchart = ["country"];
  const smalltext = ["path", "language", "country", "browser", "os", "device", "screen", "referrer"];
  const smallchart = ["browser", "os", "device", "screen"];
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    (async () => {
      setData(await getData(props));
      setLoading(false);
    })();
  }, [props]);

  if (isLoading) return <Loading />;

  if (props.tile === "multidata" && multidata.includes(props.indicator)) {
    return <Bar {...data} {...props} />;
  } else if (props.tile === "compact" && compact.includes(props.indicator)) {
    return <Number {...data} {...props} />;
  } else if (props.tile === "smalltext" && smalltext.includes(props.indicator)) {
    return <List {...data} {...props} />;
  } else if (props.tile === "bigchart" && bigchart.includes(props.indicator)) {
    return <Map {...data} {...props} />;
  } else if (props.tile === "livedata" && livedata.includes(props.indicator)) {
    return <LiveNumber {...data} {...props} />;
  } else if (props.tile === "smallchart" && smallchart.includes(props.indicator)) {
    return <Pie {...data} {...props} />;
  }
  return (
    <>
      <h1>Kachel nicht vorhanden</h1>
    </>
  );
};

export default Tile;
