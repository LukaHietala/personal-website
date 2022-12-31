import Head from "next/head";
import type { ReactNode } from "react";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>Luka Hietala</title>
        <link rel="icon" href="/images/pancho-modified.png" />
        <meta
          name="google-site-verification"
          content="P2zTBcJMQ0PKgWy4oP6BLn2h821cWDzBzgR8coaqIEQ"
        />
      </Head>
      <main className="mx-auto mt-7 mb-8">{children}</main>
    </>
  );
};

export default DefaultLayout;
