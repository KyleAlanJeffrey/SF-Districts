import "./App.css";
import Map from "./components/Map";
import { Flex } from "@chakra-ui/react";
function App() {
  return (
    <Flex w="100vw" h="100vh" justifyContent={"center"} alignItems={"center"}>
      <Map></Map>
    </Flex>
  );
}

export default App;
