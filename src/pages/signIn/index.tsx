import Head from "next/head";
import { Flex, Heading } from "@chakra-ui/react";
import SignInForm from "components/Forms/SignInForm";

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Sign In | My Diary</title>
        <meta name="description" content="My Diary" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        as="main"
        w="100%"
        minH="100vh"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
      >
        <Heading as="h1" mb={6}>
          Sign In
        </Heading>
        <SignInForm />
      </Flex>
    </>
  );
}
