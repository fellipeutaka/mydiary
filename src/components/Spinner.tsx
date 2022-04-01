import { Spinner as ChakraSpinner } from "@chakra-ui/react";

export default function Spinner() {
  return (
    <ChakraSpinner
      size="xl"
      position="absolute"
      left="50%"
      top="50%"
      ml="calc(0px - var(--spinner-size) / 2)"
      mt="calc(0px - var(--spinner-size))"
    />
  );
}
