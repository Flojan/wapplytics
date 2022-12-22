import { Text } from "@tremor/react";
import { useTranslation } from "react-i18next";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import Frame from "../Frame";
import List from "./List";

const Map = (props) => {
  const { t } = useTranslation("common");

  const geoUrl = "/world-map.json";

  function getCountryViews(countryCode, data) {
    return data.find((country) => {
      return country.name.toUpperCase() === countryCode["Alpha-2"];
    })
      ? "#76d8cf"
      : "#000";
  }

  return (
    <Frame>
      <Text>{t("charts." + props.indicator)}</Text>
      <div className="grid grid-cols-2">
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
        <List {...props} />
      </div>
    </Frame>
  );
};

export default Map;
