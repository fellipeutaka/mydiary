import Head from "next/head";
import { createRef, FormEvent, useState } from "react";
import { useAuth } from "hooks/useAuth";
import {
  Input,
  Button,
  Flex,
  Heading,
  Link,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { EmailIcon, LockIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { UserIcon } from "components/Icons";
import ReCAPTCHA from "react-google-recaptcha";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authMethods } = useAuth();
  const recaptchaRef = createRef<ReCAPTCHA>();

  function handleSignUp(e: FormEvent) {
    e.preventDefault();
    recaptchaRef.current?.execute();
    authMethods.createUserWithEmailAndPassword(name, email, password);
  }

  function onReCAPTCHAChange(captchaCode: string | null) {
    if (!captchaCode) {
      return;
    }
    recaptchaRef.current?.reset();
  }

  return (
    <>
      <Head>
        <title>Sign Up | My Diary</title>
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
          Sign Up
        </Heading>
        <Flex
          as="form"
          flexDir="column"
          w={["90%", "100%"]}
          maxW="480px"
          onSubmit={handleSignUp}
        >
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            onChange={onReCAPTCHAChange}
          />
          <InputGroup>
            <InputLeftElement pointerEvents="none" mt="3px">
              <UserIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              mb={6}
              h="46px"
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement pointerEvents="none" mt="3px">
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
            <InputLeftElement pointerEvents="none" mt="3px">
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
          <Button
            type="submit"
            my={6}
            w="100%"
            h={12}
            bgColor="blue.500"
            _hover={{ backgroundColor: "blue.400" }}
          >
            Sign Up
          </Button>
          <NextLink passHref href="/signIn">
            <Link
              fontSize="sm"
              fontWeight="bold"
              display="block"
              w="max-content"
              marginX="auto"
              verticalAlign="middle"
              color="blue.500"
              _hover={{ color: "blue.400" }}
            >
              <ArrowBackIcon w={5} h={5} mr={2} my={1} />
              Back to Sign In
            </Link>
          </NextLink>
        </Flex>
      </Flex>
    </>
  );
}
