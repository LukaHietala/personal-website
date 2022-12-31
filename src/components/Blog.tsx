import Link from "next/link";
import { useState } from "react";

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
  const [search, setSearch] = useState("");

  const filteredPosts = data.filter((post: any) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      <hr className="mt-12 rounded-md border-t-[1px] border-white border-opacity-10" />
      <input
        type="text"
        placeholder="Search Blog Posts"
        className="mt-8 w-full rounded-md border-[1px] border-white border-opacity-10 bg-secondary py-2 px-4 outline-none"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="mt-2">
        {filteredPosts.map((post: any, key) => (
          <PostCard data={post} key={key} />
        ))}
      </div>
    </div>
  );
};

const PostCard = ({ data }: PostCardProps) => {
  return (
    <Link href={`/posts/${data.slug}`}>
      <div className="mt-7 rounded-md p-4 transition-all duration-150 ease-in-out hover:bg-secondary hover:bg-opacity-50">
        <h2 className="text-primary text-2xl font-semibold">{data.title}</h2>
        <p className="mt-1 text-sm opacity-50">{data.date}</p>
        <p className="mt-2 opacity-75">{data.description}</p>
      </div>
    </Link>
  );
};

export default BlogPage;
