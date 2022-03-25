import Head from "next/head";
import { FormEvent, useContext, useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authMethods } = useContext(AuthContext);

  function handleSignIn(e: FormEvent) {
    e.preventDefault();
    authMethods.createUserWithEmailAndPassword(name, email, password);
  }
  return (
    <>
      <Head>
        <title>Sign Un | My Diary</title>
        <meta name="description" content="My Diary" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form onSubmit={handleSignIn}>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />
          <Input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <Input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Sign Up</Button>
        </form>
      </main>
    </>
  );
}
