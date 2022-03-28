import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";

import VoxelNotebookLoader from "components/3D/NotebookLoader";
const LazyVoxelNotebook = dynamic(() => import("components/3D/Notebook"), {
  ssr: false,
  loading: () => <VoxelNotebookLoader />,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>My Diary</title>
        <meta name="description" content="My Diary" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <LazyVoxelNotebook />
        <h1>Hello World</h1>
        <Link passHref href="/signIn">
          Sign In
        </Link>
      </main>
    </>
  );
}
