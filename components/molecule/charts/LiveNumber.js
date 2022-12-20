import { Card, Metric } from "@tremor/react";
import { useTranslation } from "react-i18next";

const LiveNumber = (props) => {
  const { t } = useTranslation("common");
  return (
    <div className="mt-6 flex space-x-3 items-center">
      <span className="flex justify-center items-center h-4 w-4">
        {props.data !== 0 && <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-mint opacity-75"></span>}
        <span className="relative inline-flex rounded-full h-3 w-3 bg-mint"></span>
      </span>
      <Metric>
        {props.data} {t("charts.live-user")}
      </Metric>
    </div>
  );
};

export default LiveNumber;
