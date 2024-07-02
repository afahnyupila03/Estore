import { useParams } from "react-router-dom";
import {
  CategoryService,
  ElectronicRecommendationsService,
} from "../../Services/CategoryService";
import { useQuery } from "react-query";
import ProductItemCard from "../../Components/ProductItemCard";
import UseAnimation from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";
import Icon from "../../Components/Icon";
import { reloadOutline } from "ionicons/icons";

export default function CategoryPage() {
  const { category } = useParams();

  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery(["category", category], () => CategoryService(category));
  console.log("Category: ", data);

  const categoryProducts = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center">
          <UseAnimation animation={loading} size={100} />
        </div>
      );
    } else if (isError) {
      return (
        <div className="flex justify-center">
          <Icon
            icon={reloadOutline}
            style={{ fontSize: "7rem" }}
            actionButton={() => refetch()}
          />
        </div>
      );
    } else {
      return (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((products) => (
            <ProductItemCard productData={products} key={products.id} />
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {categoryProducts()}
      </div>
    </div>
  );
}
