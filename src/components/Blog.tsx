import Link from "next/link";

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
    <div className="mt-12 border-t-4 border-gray-50 border-opacity-10 pt-4">
      {data.map((post: any, key) => (
        <PostCard data={post} key={key} />
      ))}
    </div>
  );
};

const PostCard = ({ data }: PostCardProps) => {
  return (
    <div className="mt-7">
      <Link href={`/posts/${data.slug}`}>
        <h2 className="text-2xl font-semibold">{data.title}</h2>
      </Link>
      <p className="mt-1 text-sm opacity-50">{data.date}</p>
      <p className="mt-2 opacity-75">{data.description}</p>
    </div>
  );
};

export default BlogPage;
