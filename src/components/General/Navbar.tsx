import { Box, Flex, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import ThemeToggleButton from "../Controllers/ThemeToggleButton";

export default function Navbar() {
  return (
    <Flex
      as="header"
      w="100%"
      h="68px"
      justifyContent="space-between"
      alignItems="center"
      px={6}
    >
      <Flex alignItems="center">
        <Image src="/logo.png" alt="My Diary logo" width="48px" height="48px" />
        <Text fontWeight="bold">My Diary</Text>
      </Flex>
      <Box>
        <NextLink passHref href="/signIn">
          <Link color="blue.400" mr={4}>
            Sign In
          </Link>
        </NextLink>
        <ThemeToggleButton />
      </Box>
    </Flex>
  );
}
