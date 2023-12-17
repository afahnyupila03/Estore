import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import React from "react";
import { getFeaturedProductService} from "../../Services/HomeService/HomeService";
import { shopProductService } from "../../Services/ShopService/ShopService";

export default function ProductDetails() {
  const { id, title } = useParams();
  const {id: shopId, title: shopTitle} = useParams()
  const { data = [], isLoading, error } = useQuery("product", () =>
    getFeaturedProductService(id, title)
  );
  const {data: shopItem} = useQuery("shopProduct", () => shopProductService(shopId, shopTitle))
console.log("Product Details:" + data)
  let productDetail;
  if(isLoading) {
    productDetail = <div>Loading.....</div>
  } else if(error) {
    productDetail = <div>Error....</div>
  } else if (data) {
    productDetail = <div>
      <p>{data.id}</p>
      <img src={data.image} alt={data.title} />
      <p>{data.title}</p>
      <p>{data.price}</p>
      <p>{data.category}</p>
      <p>{data.description}</p>
    </div>
  } else {
    productDetail = <div>
      <p>{shopItem.id}</p>
      <img src={shopItem.image} alt={shopItem.title} />
      <p>{shopItem.title}</p>
      <p>{shopItem.price}</p>
      <p>{shopItem.category}</p>
      <p>{shopItem.description}</p>
    </div>
  }

  return (
    <div className="text-center font-bold text-3xl align-items-center mb-20">
        <div style={{ marginTop: "10rem" }}>
          {productDetail}
        </div>
      </div>
  );
}
