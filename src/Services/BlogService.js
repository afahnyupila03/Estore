export const BlogServices = async () => {
  try {
    const res = await fetch(
      "https://api.slingacademy.com/v1/sample-data/blog-posts?offset=5&limit=30"
    );
    const data = await res.json();
    const blogPost = data.blogs;
    console.log("Service: ", blogPost);
    const blogData = [];
    for (const key in blogPost) {
      if (blogPost.hasOwnProperty(key)) {
        blogData.push({
          userId: blogPost[key].userId,
          title: blogPost[key].title,
          content: blogPost[key].content_text,
          photo: blogPost[key].photo_url,
          createdAt: blogPost[key].created_at,
          id: blogPost[key].id,
          description: blogPost[key].description,
          category: blogPost[key].category,
          updatedAt: blogPost[key].updated_at,
        });
      }
    }
    return blogData;
  } catch (error) {
    return Promise.reject(error);
  }
};
