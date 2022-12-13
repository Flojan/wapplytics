import { Card, Metric, Text } from "@tremor/react";

const CompactChart = (props) => {
  console.log(props);
  return (
    <Card key={props.data.title}>
      <Text>{props.data.title}</Text>
      <Metric>{props.data.metric}</Metric>
    </Card>
  );
};

export default CompactChart;
