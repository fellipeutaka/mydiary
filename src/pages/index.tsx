import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";

import VoxelDogLoader from "components/3D/voxel-dog-loader";
const LazyVoxelDog = dynamic(() => import("components/3D/voxel-dog"), {
  ssr: false,
  loading: () => <VoxelDogLoader />,
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
        <LazyVoxelDog />
        <h1>Hello World</h1>
        <Link passHref href="/signIn">
          Sign In
        </Link>
      </main>
    </>
  );
}
