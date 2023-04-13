import React, { useState, useEffect } from "react";
import { PolygonF } from "@react-google-maps/api";

function District(props) {
  const [feature, setFeature] = useState(props.feature_data);
  const [options, setOptions] = useState(props.options);

  function opacitySet(prev, opacity) {
    return {
      ...prev,
      strokeWeight: opacity,
    };
  }
  return (
    <div>
      <PolygonF
        feature={feature}
        key={`p_${props.index}`}
        paths={feature.geometry.coordinates}
        options={options}
        onMouseOver={(e) => {
          if (props.freezeOpacity) return;
          props.onDistrictHover(feature);
          setOptions((prev) => opacitySet(prev, 0.2));
        }}
        onMouseOut={(e) => {
          if (props.freezeOpacity) return;
          props.onDistrictHover(null);

          setOptions((prev) => opacitySet(prev, 1));
        }}
        onClick={(e) => {
          setOptions((prev) => opacitySet(prev, 0));
          props.onDistrictClick(feature);
        }}
      />
    </div>
  );
}

export default District;
