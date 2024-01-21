export default function BlogCard({blogData}) {

    const {title, id, photo, description, createdAt} = blogData || []

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article
            key={id}
            className="flex max-w-xl flex-col items-start justify-between"
          >
            <div className="flex items-center gap-x-4 text-xs">
              <time dateTime={createdAt} className="text-gray-500">
                {createdAt}
              </time>
              <a
                href="#"
                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
              >
                {title}
              </a>
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
            <div className="relative mt-8 flex items-center gap-x-4">
              <img
                src={photo}
                alt=""
                className="h-10 w-10 rounded-full bg-gray-50"
              />
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                  <a href="#">
                    <span className="absolute inset-0" />
                    No Name
                  </a>
                </p>
                <p className="text-gray-600">No role</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
