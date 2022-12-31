import Head from "next/head";
import type { ReactNode } from "react";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>Luka Hietala</title>
        <link rel="icon" href="/images/pancho-modified.png" />
      </Head>
      <main className="mx-auto mt-7 mb-8">{children}</main>
    </>
  );
};

export default DefaultLayout;
