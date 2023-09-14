import "./App.css";
import { Flex } from "@chakra-ui/react";
import ComplianceReview from "./ComplianceReview";
const App = () => {
  return (
    <>
      <Flex
        as="main"
        direction={{ base: "column", md: "column" }}
        py="6"
        px="6"
        bgColor={"#fffffe"}
      >
        <ComplianceReview />
      </Flex>
    </>
  );
};

export default App;
