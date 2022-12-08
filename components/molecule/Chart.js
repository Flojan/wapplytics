import { Card, Text, Metric, Flex, ProgressBar, BarChart } from "@tremor/react";

const Chart = () => {
  const chartdata = [
    {
      name: "Amphibians",
      "Number of threatened species": 2488,
    },
    {
      name: "Birds",
      "Number of threatened species": 1445,
    },
    {
      name: "Crustaceans",
      "Number of threatened species": 743,
    },
  ];

  return (
    <BarChart
      data={chartdata}
      dataKey="name"
      categories={["Number of threatened species"]}
      colors={["slate"]}
      // valueFormatter={dataFormatter}
      marginTop="mt-6"
      yAxisWidth="w-12"
    />
  );
};

export default Chart;
