import Head from "next/head";
import { FormEvent, useContext, useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import Link from "next/link";

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

      <main>
        <form onSubmit={handleSignIn}>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <Input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Sign In</Button>
        </form>
        <Button onClick={authMethods.signInWithGoogle}>Sign In Google</Button>
        <Link passHref href="/signUp">
          Sign Up
        </Link>
      </main>
    </>
  );
}
