import React, { useState, useEffect } from "react";
import "./ComplianceReview.css";
import {
  Card,
  CardBody,
  Stack,
  CardFooter,
  Heading,
  Button,
  Flex,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  AccordionIcon,
} from "@chakra-ui/react";

const ComplianceReview = () => {
  const { isOpen, onOpen, onClose, cancelRef } = useDisclosure();
  const [complianceData, setComplianceData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    fetch("/compliance-task-data.json")
      .then((response) => response.json())
      .then((data) => setComplianceData(data))
      .catch((error) => console.error("Error loading data:", error));
  }, []);
  const confirmCompliance = (index) => {
    setSelectedIndex(index);
    onOpen();
  };
  const handleConfirmation = () => {
    const updatedComplianceData = [...complianceData];
    updatedComplianceData[selectedIndex].confirmed = true;
    setComplianceData(updatedComplianceData);
    onClose();
    // alert("Compliance confirmed for this episode.");
  };

  return (
    <div>
      <div className="Heading">
        <h1>Compliance Review for Shows</h1>
      </div>

      {complianceData.map((item, index, items) => (
        <div key={index}>
          <Flex
            as="main"
            direction={{ base: "column", md: "column" }}
            py="10"
            px="60"
          >
            <Card
              border="2px"
              borderColor={"#181818"}
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
            >
              <Stack>
                <CardBody>
                  <Heading color={"#181818"} size="md">
                    Show Title: {item.show}
                  </Heading>{" "}
                  <Heading pt="5" size="xs" textTransform="uppercase">
                    Episode: {item.episodeNumber}
                  </Heading>
                  <Heading pt="5" size="xs" textTransform="uppercase">
                    Review Date: {item.reviewDate}
                  </Heading>
                  <Heading pt="5" size="xs" textTransform="uppercase">
                    Status: {item.status}
                  </Heading>
                  <Heading pt="5" size="xs" textTransform="uppercase">
                    Compliance Confirmed Status: {item.confirmed ? "Yes" : "No"}
                  </Heading>
                  <Accordion allowToggle>
                    <AccordionItem pt="2" pb="2">
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          <Heading pt="3" size="xs" textTransform="uppercase">
                            Issues details:
                          </Heading>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>

                      <AccordionPanel pb={4}>
                        {item.items.map((itemDetail, itemIndex) => (
                          <div key={itemIndex}>
                            <Heading pt="5" size="xs" textTransform="uppercase">
                              Timecode In & Out: {itemDetail["timecode in"]}{" "}
                              From {itemDetail["timecode out"]}
                            </Heading>
                            <Heading pt="2" size="xs" textTransform="uppercase">
                              Comment: {itemDetail.comment}
                            </Heading>

                            <Heading
                              pt="2"
                              pb="4"
                              size="xs"
                              textTransform="uppercase"
                            >
                              Category Name: {itemDetail.categoryName}
                            </Heading>
                          </div>
                        ))}
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </CardBody>

                <CardFooter>
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    onClick={() => confirmCompliance(index)}
                  >
                    Confirm
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
          </Flex>
        </div>
      ))}
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Compliance
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to confirm compliance for this episode?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleConfirmation} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default ComplianceReview;
