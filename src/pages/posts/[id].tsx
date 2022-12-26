import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import type { GetStaticPaths, GetStaticProps } from "next";
import path from "path";
import React from "react";

interface BlogPageProps {
  data: {
    title: string;
    date: string;
    tags: string[];
    description: string;
  };
  content: string;
}

const BlogPage = ({ data, content }: BlogPageProps) => {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.date}</p>
      <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
    </div>
  );
};

export default BlogPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = await fs.promises.readdir(
    path.join(process.cwd(), "src/blogs")
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
    path.join(process.cwd(), "src/blogs", `${params?.id}.md`),
    "utf-8"
  );
  const { data, content } = matter(blog);
  return {
    props: {
      data,
      content,
    },
  };
};