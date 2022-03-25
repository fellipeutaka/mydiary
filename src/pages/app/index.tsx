import Head from "next/head";
import { Button } from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { useContext } from "react";

export default function App() {
  const { user, authMethods } = useContext(AuthContext);
  return (
    <>
      <Head>
        <title>My Diary</title>
        <meta name="description" content="My Diary" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>App</h1>
        <h1>Hello {user?.displayName}</h1>
      </header>
      <main>
        <Button onClick={authMethods.signOut}>Sign Out</Button>
      </main>
    </>
  );
}
