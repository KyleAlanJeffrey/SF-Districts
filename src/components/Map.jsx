import React from "react";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import District from "./District";
import { Box, Spinner, useColorMode } from "@chakra-ui/react";
import HoverInfoOverlay from "./HoverInfoOverlay";

const ANIMATION_FPS = 35;
const SAN_FRANCISCO_COORDS = { lat: 37.7749, lng: -122.4194 };
const NORTHWEST = { lng: -122.520341, lat: 37.808983 };
const SOUTHEAST = { lng: -122.362412, lat: 37.708826 };
const options = {
  fillColor: "grey",
  fillOpacity: 0.8,
  strokeColor: "white",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  clickable: true,
  draggable: false,
  editable: false,
  geodesic: true,
  zIndex: 1,
};
function getDistrictBounds(feature) {
  let [north, south, east, west] = [-Infinity, Infinity, Infinity, -Infinity];
  feature.geometry.coordinates.forEach((coord) => {
    [north, south] = [Math.max(north, coord.lng), Math.min(south, coord.lng)];
    [west, east] = [Math.max(west, coord.lat), Math.min(east, coord.lat)];
  });
  return { north: north, south: south, east: east, west: west };
}
function Map() {
  const [map, setMap] = useState(null);
  const [districtData, setDistrictData] = useState(null);
  const [focusAnimation, setFocusAnimation] = useState(null);
  const [focusedDistrict, setFocusedDistrict] = useState(null);
  const [hoveredOverDistrict, setHoveredOverDistrict] = useState(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  // Not making this stateful
  const camera = { tilt: 0, heading: 0, zoom: 13 };
  // On Mount
  useEffect(() => {
    fetch("./geodata_lat_lng.json")
      .then((response) => response.json())
      .then((geoData) => {
        console.log(geoData.features);
        // Get the center of each district and add to each feature
        geoData.features.forEach((feature) => {
          feature.bounds = getDistrictBounds(feature);
          feature.center = {
            lng: (feature.bounds.south + feature.bounds.north) / 2,
            lat: (feature.bounds.east + feature.bounds.west) / 2,
          };
        });
        setDistrictData(geoData.features);
      });
  }, []);
  useEffect(() => {
    if (!focusedDistrict) {
      return;
    }
    clearInterval(focusAnimation);
    const animation = setInterval(() => {
      map.moveCamera({
        center: focusedDistrict.center,
        tilt: camera.tilt,
        heading: camera.heading,
        zoom: camera.zoom,
      });
      if (camera.zoom < 17) {
        camera.zoom += 0.05;
      }
      if (camera.tilt < 45) {
        camera.tilt += 0.5;
      }
      camera.heading = (camera.heading + 0.5) % 360;
    }, 1000 / ANIMATION_FPS);
    setFocusAnimation(animation);
  }, [focusedDistrict]);

  const onMapLoad = function (m) {
    console.log("Map loaded");
    setMap(m);
  };

  function handleDistrictClick(district) {
    setFocusedDistrict(district);
  }
  function handleDistrictHover(district) {
    setHoveredOverDistrict(district);
  }

  function renderMap() {
    return (
      <Box pos="absolute" w="100%" h="100%">
        <HoverInfoOverlay
          foucsedDistrict={focusedDistrict}
          hoveredOverDistrict={hoveredOverDistrict}
        />
        <GoogleMap
          clickableIcons={false}
          options={{
            disableDoubleClickZoom: true,
            disableDefaultUI: true,
            tilt: camera.tilt,
            zoom: camera.zoom,
            heading: camera.heading,
            mapId: "a46093dfacdea88c",
            restriction: {
              latLngBounds: {
                north: NORTHWEST["lat"],
                south: SOUTHEAST["lat"],
                west: NORTHWEST["lng"],
                east: SOUTHEAST["lng"],
              },
            },
          }}
          center={SAN_FRANCISCO_COORDS}
          onLoad={onMapLoad}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          {districtData?.map((feature, index) => (
            <District
              key={`district_${index}`}
              onDistrictClick={handleDistrictClick}
              onDistrictHover={handleDistrictHover}
              feature_data={feature}
              options={options}
              freezeOpacity={focusedDistrict != null}
            />
          ))}
        </GoogleMap>
      </Box>
    );
  }
  return isLoaded ? renderMap() : <Spinner />;
}

export default Map;
