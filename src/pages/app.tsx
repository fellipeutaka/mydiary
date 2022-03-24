import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function App() {
  return <h1>App</h1>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["MyDiary-token"]: token } = parseCookies(ctx);

  if (!token) {
    //TODO: validate jwt token
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
