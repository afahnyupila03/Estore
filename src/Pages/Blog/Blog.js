import { useQuery } from "react-query";
import { BlogServices } from "../../Services/BlogService";
import BlogCard from "./Components/BlogCard";

const Blog = (props) => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery("blogPost", () => BlogServices());
  console.log("Blog Page:", data)

  let BlogPost;

  if (isLoading) {
    BlogPost = <p>Loading....!</p>;
  } else if (isError) {
    BlogPost = <p>{error} Something went wrong</p>;
  } else {
    BlogPost = (
      <BlogCard blogData={data} />
    );
  }

  return (
    <div>
      <h1 className="mt-40">Blog Page</h1>
      {BlogPost}
    </div>
  );
};

export default Blog;
