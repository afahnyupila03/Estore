import { useParams } from "react-router-dom";
import {
  JewelryCategory,
  ElectronicCategory,
  MenClothingCategory,
  WomenClothingCategory,
} from "../../Services/CategoryService";
import { useQuery } from "react-query";

export default function CategoryPage() {
  const { category } = useParams();

  const getCategoryData = async () => {
    switch (category) {
      case "jewelry":
        return await JewelryCategory();
      case "electronics":
        return await ElectronicCategory();
      case "men-clothing":
        return await MenClothingCategory();
      case "women-clothings":
        return await WomenClothingCategory();
    }
  };

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery(["category", category], getCategoryData);
  console.log(data)

  let categoryProducts;
  if (isLoading) {
    categoryProducts = <p>loading...</p>;
  } else if (isError) {
    categoryProducts = <p>Error loading products</p>;
  } else {
    categoryProducts = (
      <div>
        {data.map((catData) => (
          <div key={catData.id}>
            <img src={catData.image} alt={catData.name}/> 
            <p>{catData.title}</p>
            <p>{catData.price}</p>
            <p>{catData.category}</p>
          </div>
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
