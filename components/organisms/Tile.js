import Bar from "../molecule/charts/Bar";
import Number from "../molecule/charts/Number";
import List from "../molecule/charts/List";
import Map from "../molecule/charts/Map";
import { useEffect, useState } from "react";
import Loading from "../molecule/Loading";
import { getData } from "../../utils/requests";
import LiveNumber from "../molecule/charts/LiveNumber";

const Tile = (props) => {
  const livedata = ["live-user"];
  const multidata = ["view"];
  const compact = ["view", "unique-user", "avg-visit-time", "bounce-rate"];
  const bigchart = ["country"];
  const smalltext = ["path", "language", "country", "browser", "os", "device", "screen", "referrer"];
  const smallchart = ["browser", "os", "device"];
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
  }
  return (
    <>
      <h1>Kachel nicht vorhanden</h1>
    </>
  );
};

export default Tile;
