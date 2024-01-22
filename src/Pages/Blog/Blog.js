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
  console.log("Blog Page:", data);

  let BlogPost;

  if (isLoading) {
    BlogPost = <p>Loading....!</p>;
  } else if (isError) {
    BlogPost = <p>{error} Something went wrong</p>;
  } else {
    BlogPost = (
      <div>
        {data.map((blog) => (
          <BlogCard blogData={blog} />
        ))}
       {/*  {data.map((blog) => (
          <div key={blog.id}>
            <div>
              <img src={blog.photo} alt={blog.title} />
            </div>
            <div className="flex justify-between text-red-500">
              <p>{blog.createdAt}</p>
              <p>{blog.category}</p>
            </div>
            <div>
              <p>{blog.title}</p>
              <p>{blog.description}</p>
              <p>{blog.content}</p>
            </div>
            <div>
              <button>Read More</button>
            </div>
          </div>
        ))} */}
      </div>
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
