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
          console.log(feature);
          setOptions((prev) => ({
            ...prev,
            fillOpacity: 0.2,
            geodesic: true,
          }));
        }}
        onMouseOut={(e) => {
          setOptions((prev) => ({
            ...prev,
            fillOpacity: 1,
            geodesic: false,
          }));
        }}
        onClick={(e) => {
          console.log(feature.bounds);
          let center = {
            lng: (feature.bounds.south + feature.bounds.north) / 2,
            lat: (feature.bounds.east + feature.bounds.west) / 2,
          };
          props.onDistrictClick(center, 15, 45);
        }}
      />
    </div>
  );
}

export default District;
