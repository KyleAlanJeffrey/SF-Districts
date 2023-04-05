import React from "react";
import {
  Card,
  CardBody,
  Flex,
  Center,
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
function DistrictPopup(props) {
  const [top, setTop] = useState("-30%");
  const [districtName, setDistrictName] = useState("");
  useEffect(() => {
    if (props.district == null) {
      setTop("-30%");
      return;
    }
    setDistrictName(props.district.properties.name);
    setTop("5%");
  }, [props.district]);

  return (
    <Box
      transition={"all .3s ease-in-out"}
      bg={useColorModeValue("gray.100", "gray.900")}
      position={"absolute"}
      border="solid lightgray 2px"
      borderRadius="8"
      bottom={top}
    >
      <Text fontSize={35} m={8} fontFamily={"sans-serif"}>
        {districtName} District
      </Text>
    </Box>
  );
}

export default DistrictPopup;
