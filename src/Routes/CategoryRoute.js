import CategoryPage from "../Pages/Category/Category";

export const CategoryRoute = [
    {
        path: "home/category/:category", // Static part of the path
        element: <CategoryPage />,
      },
      // Add more dynamic routes based on category names
      {
        path: "home/category/jewelerey",
        element: <CategoryPage />,
      },
      {
        path: "home/category/mens-clothing",
        element: <CategoryPage />,
      },
      {
        path: "home/category/womens-clothing",
        element: <CategoryPage />,
      },
      {
        path: "home/category/electronic",
        element: <CategoryPage />,
      }
];
