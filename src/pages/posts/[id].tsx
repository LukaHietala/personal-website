import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import Prism from "prismjs";
import { useEffect } from "react";

// require("prismjs/components/prism-tsx"); // This is not working
require("prismjs/components/prism-typescript");
require("prismjs/components/prism-bash");
require("prismjs/components/prism-json");

interface BlogPageProps {
  data: {
    title: string;
    date: string;
    tags: string[];
    description: string;
    learn_about: string[];
  };
  content: string;
}

const PostPage = ({ data, content }: BlogPageProps) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <Head>
        <title>Luka Hietala - {data.title}</title>
        <meta name="description" content={data.description} />
      </Head>
      <div className="mx-auto mb-8 mt-8 grid max-w-4xl grid-cols-4 gap-4 px-4 md:px-2 lg:px-0">
        <div className="col-span-3">
          <span className="font-medium text-primary">Blog</span>
          <h1 className="mb-3 font-titles text-2xl font-semibold lg:text-4xl">
            {data.title}
          </h1>
          <p className="text-sm opacity-80">{data.date}</p>
          <div className="mt-7 inline-flex items-center">
            <Image
              src={"/images/pancho.jpeg"}
              alt="User Image"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="ml-3">
              <p className="text-lg font-medium ">Luka Hietala</p>
            </div>
          </div>
          <Buttons />
          <p className="mt-8 text-xl font-semibold">What will you learn</p>
          <div className="mt-4 select-none">
            {data.learn_about.map((item: string, key: number) => (
              <div
                key={key}
                className="mt-2 cursor-pointer rounded-sm bg-secondary p-3 transition-all duration-150 ease-in-out hover:scale-[1.02] hover:shadow-lg"
              >
                <span className="font-medium text-primary">•</span>
                <span className="ml-2">{item}</span>
              </div>
            ))}
          </div>
          <div
            className="prose-sm prose-invert mt-5 prose-headings:font-titles prose-pre:border-[1px] prose-pre:border-white prose-pre:border-opacity-10 lg:prose lg:prose-invert"
            dangerouslySetInnerHTML={{ __html: marked(content) }}
          />
          <Comments />

          <Footer />
        </div>
        <Sidebar content={content} />
      </div>
    </>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = await fs.promises.readdir(
    path.join(process.cwd(), "src/content/blogs")
  );
  return {
    paths: blogs.map((blog) => ({
      params: {
        id: blog.replace(".md", ""),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blog = await fs.readFileSync(
    path.join(process.cwd(), "src/content/blogs", `${params?.id}.md`),
    "utf-8"
  );

  const { data, content } = await matter(blog);
  return {
    props: {
      data,
      content,
    },
  };
};

const Footer = () => {
  return (
    <footer className="mt-12 inline-flex gap-x-4">
      <a
        href="https://github.com/LukaHietala"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
      <a
        href="https://twitter.com/hietala_luka"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#1DA1F2"
        >
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        </svg>
      </a>
    </footer>
  );
};

const Comments = () => {
  // hydrate the comments and prevent it being rendered twice
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("repo", "LukaHietala/personal-website");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", "github-dark");
    const comments = document.getElementById("comments");
    comments?.appendChild(script);
  }, []);

  return <section id="comments" className="mt-12" />;
};

const getHeadings = (content: string) => {
  const data = marked(content);
  const headings = [];
  // get all headings
  const headingRegex = /<h2 id="(.*)">(.*)<\/h2>/g;

  let match = headingRegex.exec(data);
  while (match != null) {
    headings.push(match[1]);
    match = headingRegex.exec(data);
  }
  return headings;
};

function capitalizeFirstLetter(string: string) {
  const finalSentence = string.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
  return finalSentence;
}

const Sidebar = ({ content }: { content: string }) => {
  const headings = getHeadings(content);

  return (
    <aside className="">
      <div className="sticky top-6 border-l-2 border-white border-opacity-10 pl-5">
        <div className="mt-8">
          <p className="text-lg font-semibold ">Sections</p>
          <nav className="mt-4">
            <ul className="space-y-2">
              {headings.map((heading, index) => (
                <li key={index}>
                  <a
                    href={`#${heading}`}
                    className="text-sm font-medium text-white hover:text-primary"
                  >
                    {heading
                      ?.replaceAll("-", " ")
                      .split(" ")
                      .map((word) => capitalizeFirstLetter(word))
                      .join(" ")}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};

const Buttons = () => {
  return (
    <div className="mt-6 flex select-none flex-row gap-3">
      <a href={`/`}>
        <div className="w-max rounded-md bg-primary px-3 py-2 text-bg transition-all duration-150 ease-in-out hover:bg-opacity-80">
          Recourses <span className="font-medium">›</span>
        </div>
      </a>
      <Link href={"#comments"}>
        <div className="w-max rounded-md border-2 border-secondary bg-secondary bg-opacity-0  px-3 py-2 text-white transition-all duration-150 ease-in-out hover:bg-opacity-20">
          Comments
        </div>
      </Link>
    </div>
  );
};
