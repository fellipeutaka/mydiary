import {
  Input,
  Button,
  Flex,
  Link,
  Text,
  InputGroup,
  InputLeftElement,
  Divider,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { AiOutlineMail } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { FormEvent, useState } from "react";
import { useAuth } from "hooks/useAuth";
import { motion } from "framer-motion";

const MotionForm = motion(Flex);
const MotionButton = motion(Button);

const variants = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  hidden: { x: -30, opacity: 0 },
};

const Buttonvariants = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  hidden: { x: -30, opacity: 0 },
};

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { authMethods } = useAuth();

  function handleSignIn(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    authMethods
      .signInWithEmailAndPassword(email, password)
      .finally(() => setLoading(false));
  }

  return (
    <>
      <MotionForm
        as="form"
        flexDir="column"
        w={["90%", "100%"]}
        maxW="480px"
        onSubmit={handleSignIn}
        animate="visible"
        initial="hidden"
        variants={variants}
      >
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
            mb={2}
            h="46px"
          />
        </InputGroup>
        <NextLink passHref href="/forgot">
          <Link w="max-content">Forgot my password</Link>
        </NextLink>
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
          Sign In
        </Button>
        <Text alignSelf="center">
          Don&apos;t have an account?{" "}
          <NextLink passHref href="/signUp">
            <Link>Sign Up</Link>
          </NextLink>
        </Text>
        <Divider my={6} />
      </MotionForm>
      <MotionButton
        h={12}
        onClick={authMethods.signInWithGoogle}
        leftIcon={<FcGoogle fontSize={24} />}
        animate="visible"
        initial="hidden"
        variants={Buttonvariants}
      >
        Google
      </MotionButton>
    </>
  );
}
