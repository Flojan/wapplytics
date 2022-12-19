import { Card, Text } from "@tremor/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { getData } from "../../../utils/requests";
import Loading from "../Loading";

const Map = (props) => {
  // const [data, setData] = useState([]);
  // const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation("common");

  const geoUrl = "/world-map.json";

  function getCountryViews(countryCode, data) {
    return data.find((country) => {
      return country.name.toUpperCase() === countryCode["Alpha-2"];
    })
      ? "#000"
      : "#ddd";
  }

  return (
    <Card key={""} marginTop="mt-6">
      <Text>{t("charts." + props.indicator)}</Text>
      <ComposableMap
        width={900}
        height={500}
        projectionConfig={{
          center: [0, 45],
          scale: 110,
        }}
        projection="geoMercator"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) => {
            return geographies.map((geo) => {
              return <Geography key={geo.rsmKey} geography={geo} fill={getCountryViews(geo.properties, props.data)} stroke="#fff" />;
            });
          }}
        </Geographies>
      </ComposableMap>
    </Card>
  );
};

export default Map;
