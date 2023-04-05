import "./App.css";
import Map from "./components/Map";
import { Flex, Box, Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <Flex w="100vw" h="100vh" justifyContent={"center"} alignItems={"center"}>
        <Navbar></Navbar>
        <Map></Map>
      </Flex>
    </>
  );
}

export default App;
