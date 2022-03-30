import Head from "next/head";
import NextLink from "next/link";
import dynamic from "next/dynamic";

import VoxelNotebookLoader from "components/3D/NotebookLoader";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import ThemeToggleButton from "components/Controllers/ThemeToggleButton";
const LazyVoxelNotebook = dynamic(() => import("components/3D/Notebook"), {
  ssr: false,
  loading: () => <VoxelNotebookLoader />,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>My Diary</title>
        <meta name="description" content="My Diary" />
        <link rel="icon" type="image/png" href="/logo.png" />
      </Head>

      <Flex
        as="header"
        w="100%"
        h="68px"
        justifyContent="space-between"
        alignItems="center"
        px={6}
      >
        <Flex alignItems="center">
          <Image
            src="/logo.png"
            alt="My Diary logo"
            width="48px"
            height="48px"
          />
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
      <Flex
        as="main"
        w="100%"
        justifyContent="center"
        alignItems="center"
        flexDir={["column", "row"]}
      >
        <LazyVoxelNotebook />
        <Box maxW="25%">
          <Heading as="h1" mb={6} size="2xl" lineHeight="60px">
            My Diary is your digital diary.
          </Heading>
          <Text fontSize="xl">
            Keep your thoughts organized. Improve your writing. Set and achieve
            your goals. Allow yourself to self-reflect. Inspire creativity.
          </Text>
        </Box>
      </Flex>
    </>
  );
}
