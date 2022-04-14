import Head from "next/head";
import { Flex, Heading } from "@chakra-ui/react";
import SignUpForm from "components/Forms/SignUpForm";
import { motion } from "framer-motion";

const MotionContainer = motion(Flex);
const variants = {
  visible: { opacity: 1, paddingLeft: 0, transition: { duration: 0.5 } },
  hidden: { paddingLeft: 100, opacity: 0 },
};

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Sign Up | My Diary</title>
        <meta name="description" content="My Diary" />
        <link rel="icon" type="image/png" href="/logo.png" />
      </Head>

      <MotionContainer
        as="main"
        w="100%"
        minH="100vh"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        animate="visible"
        initial="hidden"
        variants={variants}
      >
        <Heading as="h1" mb={6}>
          Sign Up
        </Heading>
        <SignUpForm />
      </MotionContainer>
    </>
  );
}
