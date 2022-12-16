import { Card, Text, Metric, Flex, ProgressBar, BarChart } from "@tremor/react";
import { i18n } from "next-i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getData } from "../../../utils/requests";
import Loading from "../Loading";

const Bar = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation("common");

  useEffect(() => {
    setLoading(true);

    (async () => {
      setData(await getData(props));
      setLoading(false);
    })();
  }, []);

  const chartdatai18n = (data) => {
    let chartdata = [];
    if (data) {
      data.forEach((item) => {
        chartdata.push({
          name: t("charts." + item.name.split(" ")[0].toLowerCase()) + item.name.split(" ")[1],
          Views: item["value"],
        });
      });
    }
    return chartdata;
  };

  if (isLoading) return <Loading />;

  return (
    <BarChart
      data={props.i18n ? chartdatai18n(data.data) : data.data}
      dataKey="name"
      categories={["Views"]} // maybe entfernen da nicht i18n fähig (rechts oben die Legende)
      colors={["slate"]}
      // valueFormatter={dataFormatter}
      marginTop="mt-6"
      yAxisWidth="w-12"
    />
  );
};

export default Bar;
