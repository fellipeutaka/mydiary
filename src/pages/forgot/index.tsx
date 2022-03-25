import Head from "next/head";
import NextLink from "next/link";
import { FormEvent, useState } from "react";
import { useAuth } from "hooks/useAuth";
import {
  Input,
  Button,
  Flex,
  Heading,
  InputGroup,
  InputLeftElement,
  Link,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { authMethods } = useAuth();

  async function handleRecover(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    authMethods.forgotPassword(email).finally(() => setLoading(false));
  }
  return (
    <>
      <Head>
        <title>Recover your password | My Diary</title>
        <meta name="description" content="My Diary" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        as="main"
        flexDir="column"
        w="100%"
        minH="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <form onSubmit={handleRecover}>
          <Heading as="h1" mb={8}>
            Recover your password
          </Heading>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <EmailIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              h="46px"
            />
          </InputGroup>
          <Button
            type="submit"
            my={6}
            w="100%"
            h={12}
            bgColor="blue.500"
            _hover={{ backgroundColor: "blue.400" }}
            isLoading={loading}
          >
            Recover
          </Button>
          <NextLink passHref href="/signIn">
            <Link display="block" w="max-content" mx="auto">
              Back
            </Link>
          </NextLink>
        </form>
      </Flex>
    </>
  );
}
