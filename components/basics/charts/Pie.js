import { Card, DonutChart } from "@tremor/react";

const Pie = (props) => {
  return (
    <Card marginTop="mt-6" maxWidth="">
      <DonutChart
        data={props.data}
        category="value"
        dataKey="name"
        // colors={[]}
        variant="pie"
        valueFormatter={undefined}
        label={undefined}
        showLabel={true}
        showTooltip={true}
        showAnimation={true}
        height="h-44"
        marginTop="mt-0"
      />
    </Card>
  );
};

export default Pie;
