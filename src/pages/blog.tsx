import fs from "fs";
import matter from "gray-matter";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import path from "path";

interface PostCardProps {
  data: {
    title: string;
    date: string;
    tags: string[];
    description: string;
    slug: string;
  };
}

interface BlogPageProps {
  data: PostCardProps[];
}

const BlogPage = ({ data }: BlogPageProps) => {
  return (
    <div>
      {data.map((post: any, key) => (
        <PostCard data={post} key={key} />
      ))}
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

const PostCard = ({ data }: PostCardProps) => {
  return (
    <Link href={`/posts/${data.slug}`}>
      <div>
        <h1>{data.title}</h1>
        <p>{data.date}</p>
        <p>{data.description}</p>
        <div>
          {data.tags.map((tag, key) => (
            <span key={key}>{tag} </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default BlogPage;
