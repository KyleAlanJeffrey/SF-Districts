import React, { useState } from "react";
import { GoogleMapsOverlay as DeckOverlay } from "@deck.gl/google-maps";
import { IconLayer, GeoJsonLayer } from "@deck.gl/layers";
import { useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Text } from "@chakra-ui/react";
// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS = "https://data.sfgov.org/resource/65ik-7wqd.json";
const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 512, height: 512, mask: false },
};
function DeckGlOverlays(props) {
  const [icons, setIcons] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  useEffect(() => {
    fetch(AIR_PORTS)
      .then((response) => response.json())
      .then((res) => {
        setIcons(res);
      });
  }, []);
  useEffect(() => {
    if (icons && props.map) {
      const overlay = new DeckOverlay({
        layers: [
          new IconLayer({
            style: { cursor: "pointer" },
            data: icons,
            id: "icon-layer",
            pickable: true,
            iconAtlas:
              "https://cdn-icons-png.flaticon.com/512/1377/1377248.png",
            iconMapping: ICON_MAPPING,
            getIcon: (d) => "marker",
            sizeScale: 2,
            getPosition: (d) => {
              return d.the_geom.coordinates;
            },
            onHover: (info) => {
              console.log(info.object);
              setHoverInfo({ ...info.object, x: info.x, y: info.y });
            },
            onClick: (info) =>{
              console.log(info)
            },
            getSize: (d) => 10,
            // getColor: (d) => [0, 0, 0],
          }),
        ],
      });
      overlay.setMap(props.map);
    }
  }, [icons]);

  return (
    hoverInfo && (
      <Card
        pos="absolute"
        left={hoverInfo.x + 2}
        top={hoverInfo.y + 2}
        zIndex="5"
      >
        <CardBody>
          <Text>{hoverInfo.name}</Text>
        </CardBody>
      </Card>
    )
  );
}

export default DeckGlOverlays;
