import { DonutChart } from "@tremor/react";

const Pie = () => {
  return (
    <DonutChart
      data={[]}
      category="value"
      dataKey="name"
      colors={["blue", "red", "green"]}
      variant="pie"
      valueFormatter={undefined}
      label={undefined}
      showLabel={true}
      showTooltip={true}
      showAnimation={true}
      height="h-44"
      marginTop="mt-0"
    />
  );
};

export default Pie;
