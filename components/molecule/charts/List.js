import { BarList, Card, Text } from "@tremor/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getData } from "../../../utils/requests";
import Loading from "../Loading";

const List = (props) => {
  const [data, setData] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation("common");

  useEffect(() => {
    setLoading(true);

    (async () => {
      setData(await getData(props));
      setLoading(false);
    })();
  }, []); // triggert einen reload wenn props sich ändern

  if (isLoading) return <Loading />;

  return (
    <Card key={""} marginTop="mt-6">
      <Text>{t("charts." + props.indicator)}</Text>
      <BarList data={data.data} color="slate" showAnimation={true} marginTop="mt-6" />
    </Card>
  );
};

export default List;
