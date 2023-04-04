import React, { useState } from "react";
import { PolygonF } from "@react-google-maps/api";

function District(props) {
  const [feature, setFeature] = useState(props.feature_data);
  const [options, setOptions] = useState(props.options);
  return (
    <div style={{ colo: "1s ease-out" }}>
      <PolygonF
        feature={feature}
        key={`p_${props.index}`}
        paths={feature.geometry.coordinates}
        options={options}
        onMouseOver={(e) => {
          console.log(feature.properties.name);
          setOptions((prev) => ({
            ...prev,
            fillOpacity: 0.2,
          }));
        }}
        onMouseOut={(e) => {
          setOptions((prev) => ({
            ...prev,
            fillOpacity: 1,
          }));
        }}
        onClick={(e) => {
          let center = {
            lng: (feature.bounds.south + feature.bounds.north) / 2,
            lat: (feature.bounds.east + feature.bounds.west) / 2,
          };
          setOptions((prev) => ({
            ...prev,
            fillOpacity: 0,
          }));
          props.onDistrictClick(center);
        }}
      />
    </div>
  );
}

export default District;
