import React from "react";
import { Link } from "react-router-dom";

export default function ProductCategoryCardItem({ categoryData }) {
  const {
    categoryText,
    categoryRoute,
    categoryLink,
    categoryImage,
    categoryImageText,
  } = categoryData;

  return (
    <div>
      <div>
        <div>
          <img
            src={categoryImage}
            alt={categoryImageText}
            className="object-cover h-48 w-96"
          />
        </div>
        <div>
          <p>{categoryText}</p>
          <Link to={categoryRoute}>{categoryLink}</Link>
        </div>
      </div>
    </div>
  );
}
