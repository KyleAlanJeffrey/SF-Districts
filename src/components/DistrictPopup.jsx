import React from "react";
import {
  Card,
  CardBody,
  Flex,
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
    <Flex justifyContent={"center"}>
      <Card
        transition={"all .3s ease-in-out"}
        pos={"absolute"}
        bottom={top}
        zIndex={"3"}
        paddingX={"25"}
        bg="white"
        border="solid lightgray 2px"
        borderRadius={"10px"}
      >
        <CardBody>
          <Text fontSize="35" fontFamily={"sans-serif"}>
            {districtName} District
          </Text>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default DistrictPopup;
