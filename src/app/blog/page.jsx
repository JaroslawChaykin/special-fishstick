import Link from "next/link";

const getBlogPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
};

const Blog = async () => {
  const posts = await getBlogPosts();

  return (
    <div>
      <b>Blog</b>
      <div>
        {posts.map((post) => (
          <Link href={`/blog/${post.id}`} key={post.id}>
            <div>{post.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
