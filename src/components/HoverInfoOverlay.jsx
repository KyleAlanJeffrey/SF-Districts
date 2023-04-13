import DistrictPopup from "./DistrictPopup";
import React from "react";
import { Flex, Box} from "@chakra-ui/react";

function HoverInfoOverlay(props) {
  
  return (
    <Box
      hidden={props.hoveredOverDistrict == null}
      overflow="hidden"
      position="absolute"
      w="100%"
      h="100%"
      border="solid black 2px"
      zIndex="3"
      pointerEvents="none"
    >
      <Flex justifyContent="center">
        <DistrictPopup district={props.hoveredOverDistrict} />
      </Flex>
    </Box>
  );
}

export default HoverInfoOverlay;
