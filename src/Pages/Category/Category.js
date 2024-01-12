import { useParams } from "react-router-dom";
import {
  CategoryService,
} from "../../Services/CategoryService";
import { useQuery } from "react-query";
import ProductItemCard from "../../Components/ProductItemCard";

export default function CategoryPage() {
  const { category } = useParams();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery(["category", category], () => CategoryService(category));
  console.log("Category: ", data)

  let categoryProducts;
  if (isLoading) {
    categoryProducts = <p>loading...</p>;
  } else if (isError) {
    categoryProducts = <p>Error loading products</p>;
  } else {
    categoryProducts = (
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {data.map((products) => (
        <ProductItemCard productData={products} key={products.id} />
      ))}
    </div>
    );
  }

  return (
    <div>
      <h1>{category}</h1>
      {categoryProducts}
    </div>
  );
}
