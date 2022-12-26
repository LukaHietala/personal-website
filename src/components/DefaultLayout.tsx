import Head from "next/head";
import type { ReactNode } from "react";
import Navbar from "./navbar/Navbar";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>My App</title>
      </Head>
      <main className="mx-auto mt-7 mb-8 max-w-5xl">
        <header>
          <Navbar />
        </header>
        {children}
      </main>
    </>
  );
};

export default DefaultLayout;
