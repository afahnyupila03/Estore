import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import React from "react";
import { getFeaturedProductService } from "../../Services/HomeService";
import { CategoryServiceItem } from "../../Services/CategoryService";
import UseAnimation from "../../Components/Loader";
import Icon from "../../Components/Icon";
import { reloadOutline } from "ionicons/icons";
import loading from "react-useanimations/lib/loading";

export default function ProductDetails() {
  const { id, title, shopId, shopTitle } = useParams();

  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery("product", () => {
    if ((shopId, shopTitle)) {
      return CategoryServiceItem(shopId, shopTitle);
    } else if ((id, title)) {
      return getFeaturedProductService(id, title);
    }
  });
  

  let productDetail;

  if (isLoading) {
    productDetail = (
      <div className="flex justify-center">
        <UseAnimation animation={loading} size={100} />
      </div>
    );
  } else if (error) {
    productDetail = (
      <div className="flex justify-center">
        <Icon
          icon={reloadOutline}
          style={{ fontSize: "7rem" }}
          actionButton={() => refetch()}
        />
      </div>
    );
  } else {
    productDetail = (
      <div>
        <p>{data.id}</p>
        <img src={data.thumbnail} alt={data.title} />
        {data.images.map(image => (
          <img src={image} />
        ))}
        <p>{data.title}</p>
        <p>{data.price}</p>
        <p>{data.category}</p>
        <p>{data.description}</p>
      </div>
    );
  }

  return (
    <div className="text-center font-bold text-3xl align-items-center mb-20">
      <div style={{ marginTop: "10rem" }}>{productDetail}</div>
    </div>
  );
}
