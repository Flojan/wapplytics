import { Card, Text, Metric, Flex, ProgressBar, BarChart } from "@tremor/react";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const Chart = (props) => {
  return (
    <React.StrictMode>
      <BarChart
        data={props.chartdata.data}
        dataKey="date"
        categories={["views"]}
        colors={["slate"]}
        // valueFormatter={dataFormatter}
        marginTop="mt-6"
        yAxisWidth="w-12"
      />
    </React.StrictMode>
  );
};

export default Chart;
