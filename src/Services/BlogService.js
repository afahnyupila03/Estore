export const BlogServices = async () => {
  try {
    const res = await fetch(
      "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=01d60bb1389b466e9c9ab1a1553daa12"
    );
    const data = await res.json();
    const blogArticles = data.articles;
    const articles = [];
    for (const key in blogArticles) {
      if (blogArticles.hasOwnProperty(key)) {
        articles.push({
          id: blogArticles[key].source.id,
          name: blogArticles[key].source.name,
          author: blogArticles[key].author,
          title: blogArticles[key].title,
          description: blogArticles[key].description,
          url: blogArticles[key].url,
          urlToImage: blogArticles[key].urlToImage,
          publishedAt: blogArticles[key].publishedAt,
          content: blogArticles[key].content,
        });
      }
    }
    return articles;
  } catch (err) {
    return Promise.reject(err instanceof Error ? err : new Error(err));
  }
};

export const BlogService = async (id) => {
  try {
    const res = await fetch(
      `https://api.slingacademy.com/v1/sample-data/blog-posts/${id}`
    );
    const data = await res.json();
    const blogPost = {
      userId: data.userId,
      title: data.title,
      content: data.content_text,
      photo: data.photo_url,
      createdAt: data.created_at,
      id: data.id,
      description: data.description,
      category: data.category,
      updatedAt: data.updated_at,
    };
    return blogPost;
  } catch (err) {
    return Promise.reject(err instanceof Error ? err : new Error(err));
  }
};
