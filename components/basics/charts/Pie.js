import { DonutChart, Text } from "@tremor/react";
import { useTranslation } from "react-i18next";
import Frame from "../Frame";
import List from "./List";

const Pie = (props) => {
  const { t } = useTranslation("common");
  return (
    <Frame>
      <Text>{t("charts." + props.indicator)}</Text>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <DonutChart
          data={props.data}
          category="value"
          dataKey="name"
          variant="pie"
          showLabel={true}
          showTooltip={true}
          showAnimation={true}
          height="h-64"
          marginTop="mt-6"
        />
        <List {...props} />
      </div>
    </Frame>
  );
};

export default Pie;
