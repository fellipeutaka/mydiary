import Head from "next/head";
import { Button, Input, Textarea } from "@chakra-ui/react";
import { useAuth } from "hooks/useAuth";
import { Data } from "types/Data";

export default function App() {
  const date = new Date();
  const today = date.toLocaleString("us", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const { user, authMethods } = useAuth();

  return (
    <>
      <Head>
        <title>My Diary</title>
        <meta name="description" content="My Diary" />
        <link rel="icon" type="image/png" href="/logo.png" />
      </Head>

      <header>
        <h1>App</h1>
        <h1>Hello {user?.displayName}</h1>
        <Button onClick={authMethods.signOut}>Sign Out</Button>
      </header>
      <main>
        <h1>{today}.</h1>
      </main>
    </>
  );
}
