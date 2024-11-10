import cl from "./page.module.css";

const getBlogPostInfo = async (id) => {
  const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!post.ok) {
    throw new Error("Failed to fetch");
  }

  return post.json();
};

const getBlogPostUser = async (id) => {
  const userByPost = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  if (!userByPost.ok) {
    throw new Error("Failed to fetch");
  }

  return userByPost.json();
};

const getBlogPostComments = async (id) => {
  const commentsByPost = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`
  );

  if (!commentsByPost.ok) {
    throw new Error("Failed to fetch");
  }

  return commentsByPost.json();
};

export async function generateMetadata({ params }) {
  const locale = await params;
  const data = await getBlogPostInfo(locale.postId);

  return {
    title: data.title,
    description: data.body,
  };
}

const Post = async ({ params }) => {
  const locale = await params;
  const post = await getBlogPostInfo(locale.postId);
  const user = await getBlogPostUser(post.userId);
  const comments = await getBlogPostComments(post.id);

  return (
    <div>
      <div className={cl.avatar}>
        <span className={cl.circle}></span>
        <h1>{user.name}</h1>
      </div>
      <div className={cl.content}>
        <div className={cl.post}>
          <h1 className={cl.title}>{post.title}</h1>
          <div className={cl.date}>Created: 22.04.2018</div>
          <p className={cl.bodyPost}>{post.body.repeat(10)}</p>
        </div>
        <div className={cl.social}>
          <div className={cl.socialControl}>
            <div className={cl.buttons}>
              <button>32 Like</button>
              <button>1654 Dislike</button>
            </div>
            <div>
              <h2>Add comment</h2>
              <p>you need to first Login/Registration</p>
            </div>
          </div>
          <div className={cl.comments}>
            <h1>Comments</h1>
            {comments.map((comment) => (
              <div key={comment.key}>
                <h3>{comment.email}</h3>
                <div>{comment.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
