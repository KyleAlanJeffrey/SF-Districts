import React from "react";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import District from "./District";
import { Flex, Box, Spinner } from "@chakra-ui/react";
import matchers from "@testing-library/jest-dom/matchers";
const SAN_FRANCISCO_COORDS = { lat: 37.7749, lng: -122.4194 };
const NORTHWEST = { lng: -122.520341, lat: 37.808983 };
const SOUTHEAST = { lng: -122.362412, lat: 37.708826 };
const options = {
  fillColor: "grey",
  fillOpacity: 1,
  strokeColor: "white",
  strokeOpacity: 1,
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
  const [center, setCenter] = useState(SAN_FRANCISCO_COORDS);
  const [heading, setHeading] = useState(0);
  const [tilt, setTilt] = useState(0);
  const [zoom, setZoom] = useState(13);
  const [districtData, setDistrictData] = useState(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  useEffect(() => {
    if (isLoaded) {
      console.log("loaded google Maps API");
    }
  }, [isLoaded]);
  // On Mount
  useEffect(() => {
    fetch("./geodata_lat_lng.json")
      .then((response) => response.json())
      .then((geoData) => {
        console.log(geoData.features);
        // Get the center of each district and add to each feature
        geoData.features.forEach((feature) => {
          feature.bounds = getDistrictBounds(feature);
        });
        setDistrictData(geoData.features);
      });
  }, []);
  const onMapLoad = function (m) {
    setMap(m);
  };
  function handleDistrictClick(bounds, zoom, tilt) {
    map.setZoom(15);
    map.setTilt(60);
    map.panTo(bounds);

    setInterval(() => {
      setHeading(heading + 5);
    }, 100);
  }
  useEffect(() => {
    if (!map) {
      return;
    }
    map.setHeading(180);
  }, [heading]);
  function renderMap() {
    return (
      <Box pos="absolute" w="90%" h="90%">
        <GoogleMap
          clickableIcons={false}
          options={{
            restriction: {
              latLngBounds: {
                north: NORTHWEST["lat"],
                south: SOUTHEAST["lat"],
                west: NORTHWEST["lng"],
                east: SOUTHEAST["lng"],
              },
            },
          }}
          tilt={tilt}
          center={center}
          zoom={zoom}
          onLoad={onMapLoad}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          {districtData?.map((feature, index) => (
            <District
              key={`district_${index}`}
              onDistrictClick={handleDistrictClick}
              feature_data={feature}
              options={options}
            />
          ))}
        </GoogleMap>
      </Box>
    );
  }
  return isLoaded ? renderMap() : <Spinner />;
}

export default Map;
