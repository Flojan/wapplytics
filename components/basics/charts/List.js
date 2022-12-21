import { BarList, Card, Text } from "@tremor/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getData } from "../../../utils/requests";
import Loading from "../../basics/Loading";

const List = (props) => {
  // const [data, setData] = useState(false);
  // const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation("common");

  const chartdatai18n = (data) => {
    let chartdata = [];
    if (data) {
      data.forEach((item) => {
        chartdata.push({
          name: t("countries." + item.name),
          value: item.value,
        });
      });
    }
    return chartdata;
  };

  return (
    <Card marginTop="mt-6">
      <Text>{t("charts." + props.indicator)}</Text>
      <BarList data={props.i18n ? chartdatai18n(props.data) : props.data} color="slate" showAnimation={true} marginTop="mt-6" />
    </Card>
  );
};

export default List;
