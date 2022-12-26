import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  console.log(process.cwd());
  const { data: sessionData } = useSession();

  return <div></div>;
};

export default Home;
