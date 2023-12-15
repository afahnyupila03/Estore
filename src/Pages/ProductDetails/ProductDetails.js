import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import React from "react";
import { getArrivalProductService} from "../../Services/HomeService/HomeService";

export default function ProductDetails({ prodId }) {
  const { productId } = useParams();
  const { data = [], isLoading, error } = useQuery("product", () =>
    getArrivalProductService(productId)
  );

  let productDetail;
  if(isLoading) {
    productDetail = <div>Loading.....</div>
  } else if(error) {
    productDetail = <div>Error....</div>
  } else {
    productDetail = <div>
      <p>{data.id}</p>
      <img src={data.image} alt={data.title} />
      <p>{data.title}</p>
      <p>{data.price}</p>
      <p>{data.category}</p>
      <p>{data.description}</p>
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
