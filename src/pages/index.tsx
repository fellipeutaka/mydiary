import Head from "next/head";
import { FormEvent, useContext, useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function Home() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { signInWithEmailAndPassword } = useContext(AuthContext);

  function handleSignIn(e: FormEvent) {
    e.preventDefault();

    signInWithEmailAndPassword(name, password);
  }
  return (
    <>
      <Head>
        <title>My Diary</title>
        <meta name="description" content="My Diary" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hello World</h1>
        <form onSubmit={handleSignIn}>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["MyDiary-token"]: token } = parseCookies(ctx);

  if (token) {
    //TODO: validate jwt token
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
