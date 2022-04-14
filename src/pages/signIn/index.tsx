import Head from "next/head";
import { Flex, Heading } from "@chakra-ui/react";
import SignInForm from "components/Forms/SignInForm";
import { motion } from "framer-motion";

const MotionContainer = motion(Flex);
const variants = {
  visible: { opacity: 1, paddingRight: 0, transition: { duration: 0.5 } },
  hidden: { paddingRight: 100, opacity: 0 },
};

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Sign In | My Diary</title>
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
          Sign In
        </Heading>
        <SignInForm />
      </MotionContainer>
    </>
  );
}
