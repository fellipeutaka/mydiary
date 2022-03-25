import Head from "next/head";
import { FormEvent, useContext, useState } from "react";
import {
  Input,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  InputGroup,
  InputLeftElement,
  Divider,
} from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import NextLink from "next/link";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { GoogleIcon } from "components/Icons";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authMethods } = useContext(AuthContext);

  function handleSignIn(e: FormEvent) {
    e.preventDefault();
    authMethods.signInWithEmailAndPassword(email, password);
  }
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
        <Flex as="form" flexDir="column" w="480px" onSubmit={handleSignIn}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <EmailIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              mb={6}
              h="46px"
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <LockIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              mb={2}
              h="46px"
            />
          </InputGroup>
          <NextLink passHref href="/forgot">
            <Link>Forgot my password</Link>
          </NextLink>
          <Button type="submit" my={6} w="100%" h={12}>
            Sign In
          </Button>
          <Text alignSelf="center">
            Don&apos;t have an account?{" "}
            <NextLink passHref href="/signUp">
              <Link>Sign Up</Link>
            </NextLink>
          </Text>
          <Divider my={6} />
        </Flex>
        <Button
          h={12}
          onClick={authMethods.signInWithGoogle}
          leftIcon={<GoogleIcon w={8} h={8} />}
        >
          Google
        </Button>
      </Flex>
    </>
  );
}
