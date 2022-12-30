import fs from "fs";
import matter from "gray-matter";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";
import path from "path";
import BlogPage from "../components/Blog";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data,
}) => {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={"/images/pancho.jpeg"}
          alt="User Image"
          width={100}
          height={100}
          className="rounded-full"
        />
        <h1 className="mt-2 font-titles text-3xl font-bold">Luka Hietala</h1>
        <p className="mt-2 text-gray-300">
          Software Developer from Finland. tRPC, Next.js, React and TypeScript.
        </p>
        <div className="mt-1 flex space-x-2 rounded-md p-1 font-medium text-gray-300 transition-all duration-150 ease-in-out hover:bg-secondary ">
          <a href="https://github.com/LukaHietala">Github</a>
        </div>
        <div>
          <BlogPage data={data} />
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await fs.promises.readdir(
    path.join(process.cwd(), "src/blogs")
  );
  const data = await Promise.all(
    blogs.map(async (blog) => {
      const blogFile = await fs.readFileSync(
        path.join(process.cwd(), "src/blogs", blog),
        "utf-8"
      );
      const { data } = matter(blogFile);
      return data;
    })
  );
  return {
    props: {
      data,
    },
  };
};

export default Home;
