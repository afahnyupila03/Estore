import { useQuery } from "react-query";
import { BlogServices } from "../../Services/BlogService";
import BlogCard from "./Components/BlogCard";
import UseAnimation from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";
import Icon from "../../Components/Icon";
import { reloadOutline } from "ionicons/icons";

const Blog = () => {
  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery("blogPost", () => BlogServices());

  const renderLoading = () => (
    <div className="bg-white py-5 sm:py-32">
      <div className="mx-auto max-w-7xl px-3 lg:px-2">
        <div className="flex justify-center">
          <UseAnimation animation={loading} size={100} />
        </div>
      </div>
    </div>
  );

  const renderError = () => (
    <div className="bg-white py-5 sm:py-32">
      <div className="mx-auto max-w-7xl px-3 lg:px-2">
        <div className="flex justify-center">
          <Icon
            style={{ fontSize: "7rem" }}
            icon={reloadOutline}
            actionButton={() => refetch()}
          />
        </div>
      </div>
    </div>
  );

  const renderBlogPost = (data) => (
    <div className="bg-white py-5 sm:py-32">
      <div className="mx-auto max-w-7xl px-3 lg:px-2">
        <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-5 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {data.map((blog) => (
            <BlogCard blogData={blog} key={blog.id} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderBlogData = () => {
    if (isLoading) {
      return renderLoading();
    } else if (isError) {
      return renderError();
    } else {
      return renderBlogPost(data);
    }
  };

  return <div>{renderBlogData()}</div>;
};

export default Blog;
