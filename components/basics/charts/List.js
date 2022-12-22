import { BarList, Text } from "@tremor/react";
import { useTranslation } from "react-i18next";
import Frame from "../Frame";

const List = (props) => {
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
    <Frame>
      <Text>{t("charts." + props.indicator)}</Text>
      <BarList data={props.i18n ? chartdatai18n(props.data) : props.data} color="slate" showAnimation={true} marginTop="mt-6" />
    </Frame>
  );
};

export default List;
