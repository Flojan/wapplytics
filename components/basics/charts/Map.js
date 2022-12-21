import { Card, Text } from "@tremor/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { getData } from "../../../utils/requests";
import Tile from "../../Tile";
import Loading from "../../basics/Loading";

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
        <Tile website_id={props.website_id} user_id={props.user_id} tile="smalltext" indicator="country" i18n="true" />
      </div>
    </Card>
  );
};

export default Map;
