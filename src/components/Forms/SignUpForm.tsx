import { FormEvent, useState } from "react";
import { useAuth } from "hooks/useAuth";
import {
  Input,
  Button,
  Flex,
  Link,
  InputGroup,
  InputLeftElement,
  useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import ReCAPTCHA from "react-google-recaptcha";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { authMethods } = useAuth();
  const { colorMode } = useColorMode();

  function handleSignUp(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    authMethods
      .createUserWithEmailAndPassword(name, email, password, token)
      .finally(() => setLoading(false));
  }

  return (
    <Flex
      as="form"
      flexDir="column"
      w={["90%", "100%"]}
      maxW="480px"
      onSubmit={handleSignUp}
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none" mt="3px">
          <AiOutlineUser color="gray.300" />
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
          <AiOutlineMail color="gray.300" />
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
          <BiLock color="gray.300" />
        </InputLeftElement>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb={6}
          h="46px"
        />
      </InputGroup>
      <ReCAPTCHA
        style={{ alignSelf: "center" }}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
        onChange={(token) => setToken(token)}
        theme={colorMode}
      />
      <Button
        type="submit"
        isLoading={loading}
        my={6}
        w="100%"
        h={12}
        color="#fff"
        bgColor="blue.500"
        _hover={{ backgroundColor: "blue.400" }}
      >
        Sign Up
      </Button>
      <NextLink passHref href="/signIn">
        <Link
          fontSize="sm"
          fontWeight="bold"
          marginX="auto"
          color="blue.500"
          _hover={{ color: "blue.400" }}
        >
          <BsArrowLeft
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginRight: 4,
            }}
          />
          Back to Sign In
        </Link>
      </NextLink>
    </Flex>
  );
}
