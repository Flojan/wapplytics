import { BarChart, Card } from "@tremor/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getData } from "../../../utils/requests";
import Tile from "../../Tile";
import Loading from "../../basics/Loading";

const Bar = (props) => {
  // const [data, setData] = useState([]);
  // const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation("common");

  // useEffect(() => {
  //   setLoading(true);

  //   (async () => {
  //     setData(await getData(props));
  //     setLoading(false);
  //   })();
  //   console.log("props.data", props.data);
  //   console.log("data", data);
  // }, [props]);

  const chartdatai18n = (data) => {
    let chartdata = [];
    if (data) {
      data.forEach((item) => {
        chartdata.push({
          name:
            t("charts." + item.name.split(" ")[0].toLowerCase()) + (item.name.split(" ")[1] === undefined ? "" : item.name.split(" ")[1]),
          Views: item["value"],
        });
      });
    }
    return chartdata;
  };

  // if (isLoading) return <Loading />;
  return (
    <Card marginTop="mt-6">
      <div className="grid grid-cols-4 gap-4">
        <Tile website_id={props.website_id} user_id={props.user_id} tile="compact" indicator="view" />
        <Tile website_id={props.website_id} user_id={props.user_id} tile="compact" indicator="unique-user" />
        <Tile website_id={props.website_id} user_id={props.user_id} tile="compact" indicator="bounce-rate" />
        <Tile website_id={props.website_id} user_id={props.user_id} tile="compact" indicator="avg-visit-time" />
      </div>
      <BarChart
        data={props.i18n ? chartdatai18n(props.data) : props.data}
        dataKey="name"
        categories={["Views"]}
        colors={["slate"]}
        marginTop="mt-6"
        yAxisWidth="w-12"
      />
    </Card>
  );
};

export default Bar;
