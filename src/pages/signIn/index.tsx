import Head from "next/head";
import { Flex, Heading } from "@chakra-ui/react";
import SignInForm from "components/Forms/SignInForm";
import { motion } from "framer-motion";

const MotionHeading = motion(Heading);

const variants = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  hidden: { x: -30, opacity: 0 },
};

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Sign In | My Diary</title>
        <meta name="description" content="My Diary" />
        <link rel="icon" type="image/png" href="/logo.png" />
      </Head>

      <Flex
        as="main"
        w="100%"
        minH="100vh"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
      >
        <MotionHeading
          as="h1"
          mb={6}
          animate="visible"
          initial="hidden"
          variants={variants}
        >
          Sign In
        </MotionHeading>
        <SignInForm />
      </Flex>
    </>
  );
}
