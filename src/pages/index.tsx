import Head from "next/head";
import dynamic from "next/dynamic";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Navbar from "components/Navbar";
import VoxelNotebookLoader from "components/3D/NotebookLoader";

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

      <Navbar />
      <Flex
        as="main"
        w="100%"
        justifyContent="center"
        alignItems="center"
        flexDir={["column", "row"]}
        mb={[16, 32]}
      >
        <LazyVoxelNotebook />
        <Box maxW={["100%", "25%"]} textAlign={["center", "left"]} px={6}>
          <Heading as="h1" mb={[4, 6]} size="2xl" lineHeight="60px">
            My Diary is your digital diary.
          </Heading>
          <Text fontSize="xl">
            Keep your thoughts organized. Improve your writing. Set and achieve
            your goals. Allow yourself to self-reflect. Inspire creativity.
          </Text>
        </Box>
      </Flex>
      <Flex
        as="section"
        w="100%"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        textAlign="center"
        px={6}
      >
        <Heading as="h1" mb={[2, 4]} size="xl" lineHeight="48px">
          It&apos;s more than a simply diary. It&apos;s a digital security
          diary.
        </Heading>
        <Text fontSize="xl" maxW={["100%", "55%"]}>
          Start with My Diary. Personalize your diary with photos and audios.
          Manage your days. Organize your notes. Remember your goals everyday -
          all in one place.
        </Text>
      </Flex>
    </>
  );
}
