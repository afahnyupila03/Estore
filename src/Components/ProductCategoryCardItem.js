import React from "react";
import { Link } from "react-router-dom";

export default function ProductCategoryCardItem({ categoryData }) {
  const { categoryRoute, categoryLink } = categoryData;

  function UpperCaseLink(link = "") {
    return link.toUpperCase();
  }

  return (
    <div>
      <div
        loading="lazy"
        className="border-gray-700 border-2 rounded-full hover:text-white hover:bg-gray-700 hover:border-gray-500"
      >
        <Link
          className="p-2 lg:text-lg font-semibold text-xs font-mono flex items-center justify-center"
          to={`category/${categoryRoute}`}
        >
          {UpperCaseLink(categoryLink)}
        </Link>
      </div>
    </div>
  );
}
