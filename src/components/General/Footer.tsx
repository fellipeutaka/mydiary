import { Flex, Link, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      as="footer"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      py={6}
    >
      <Text>
        Developed by{" "}
        <Link href="https://github.com/fellipeutaka" isExternal>
          Fellipe Utaka
        </Link>
      </Text>
      <Text>&copy; Copyright 2022. All rights reserved.</Text>
    </Flex>
  );
}
