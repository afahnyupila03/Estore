export default function BlogCard({ blogData }) {
  const { title, id, urlToImage, name, publishedAt, author, description, url } =
    blogData || [];
  const formattedCreatedAt = new Date(publishedAt);

  return (
    <article
      key={id}
      className="flex max-w-xl flex-col items-start justify-between"
    >
      <div>
        <img
          src={urlToImage}
          alt={title}
          className="object-cover overflow-hidden rounded-lg bg-gray-50"
        />
      </div>
      <div className="flex items-center justify-between">
        <time dateTime={publishedAt} className="text-gray-500">
          <span>{formattedCreatedAt.toLocaleDateString("en-CA")}</span>
          <span className="ml-1 mr-1">-</span>
          <span>
            {formattedCreatedAt.toLocaleTimeString("en-US", { hour12: false })}
          </span>
        </time>

        <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
          {author}
        </p>
      </div>

      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a href="#">
            <span className="absolute inset-0" />
            {title}
          </a>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {description}
        </p>
      </div>
      <div className="relative mt-8 flex  items-center gap-x-4">
        <div className="text-sm leading-6">
          <p className="text-gray-600">{name}</p>
          <p className="font-semibold text-gray-900">
            <a href={url}>
              <span className="absolute inset-0" />
              Read more
            </a>
          </p>
        </div>
      </div>
    </article>
  );
}
