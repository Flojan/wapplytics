import { Card, Text } from "@tremor/react";
import { useTranslation } from "react-i18next";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const Map = (props) => {
  const { t } = useTranslation("common");
  const data = [
    { country: "cn", value: 138 }, // china
    { country: "in", value: 134 }, // india
    { country: "us", value: 3986 }, // united states
    { country: "id", value: 26824 }, // indonesia
    { country: "pk", value: 2836 }, // pakistan
    { country: "br", value: 2101 }, // brazil
    { country: "ng", value: 14 }, // nigeria
    { country: "bd", value: 105 }, // bangladesh
    { country: "ru", value: 641 }, // russia
    { country: "mx", value: 112 }, // mexico
  ];

  const geoUrl = "/world-map.json";

  function getCountryViews(countryCode) {
    return data.find((country) => {
      return country.country.toUpperCase() === countryCode["Alpha-2"];
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
          //   rotate: [-10, -10, -10],
          center: [0, 45],
          scale: 110,
        }}
        projection="geoMercator"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) => {
            return geographies.map((geo) => {
              return <Geography key={geo.rsmKey} geography={geo} fill={getCountryViews(geo.properties)} stroke="#fff" />;
            });
          }}
        </Geographies>
      </ComposableMap>
    </Card>
  );
};

export default Map;
