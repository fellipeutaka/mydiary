import Head from "next/head";
import dynamic from "next/dynamic";
import NextLink from "next/link";

import { Box, Heading, Link, Text } from "@chakra-ui/react";
import Navbar from "components/General/Navbar";
import VoxelNotebookLoader from "components/3D/NotebookLoader";
import Section from "components/General/Section";
import Image from "next/image";
import Footer from "components/General/Footer";
import { HomeDocument, useHomeQuery } from "generated/graphql";
import { GetStaticProps } from "next";
import { client, ssrCache } from "lib/urql";
import HomeMain from "components/General/HomeMain";

const LazyVoxelNotebook = dynamic(() => import("components/3D/Notebook"), {
  ssr: false,
  loading: () => <VoxelNotebookLoader />,
});

export default function Home() {
  const [{ data }] = useHomeQuery();
  return (
    <>
      <Head>
        <title>My Diary</title>
        <meta name="description" content="My Diary" />
        <link rel="icon" type="image/png" href="/logo.png" />
      </Head>

      <Navbar />
      <HomeMain>
        <LazyVoxelNotebook />
        <Box
          maxW={["100%", "100%", "25%"]}
          textAlign={["center", "center", "left"]}
          px={6}
        >
          <Heading as="h1" mb={[4, 6]} size="2xl" lineHeight="60px">
            {data?.page?.title}
          </Heading>
          <Text fontSize="xl">{data?.page?.description}</Text>
        </Box>
      </HomeMain>
      <Section delay={0.2}>
        <Heading as="h1" size="xl" lineHeight="48px">
          {data?.page?.sectionTitle}
        </Heading>
        <Text fontSize="xl" maxW={["100%", "55%"]}>
          {data?.page?.sectionDescription}
        </Text>
        <NextLink href="/signIn" passHref>
          <Link
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius={6}
            h={12}
            px={6}
            bgColor="blue.500"
            _hover={{ backgroundColor: "blue.400" }}
          >
            Start your diary
          </Link>
        </NextLink>
        <Image
          src={data!.page!.image.url}
          width="1110px"
          height="778.5px"
          quality={100}
          alt="Board UI"
        />
      </Section>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  await client.query(HomeDocument).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },

    revalidate: 1 * 60, // 1 minute
  };
};
