import "./App.css";
import Map from "./components/Map";
import { Flex } from "@chakra-ui/react";
function App() {
  return (
    <Flex w="100vw" h="100vh">
      <Map></Map>
    </Flex>
  );
}

export default App;
