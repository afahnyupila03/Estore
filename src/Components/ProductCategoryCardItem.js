import React from "react";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { arrowForward } from "ionicons/icons";

export default function ProductCategoryCardItem({ categoryData }) {
  const { categoryRoute, categoryLink, categoryImage, categoryImageText } =
    categoryData;

  return (
    <div>
      <div loading="lazy" className="border-black border-2 rounded-full shadow-xl shadow-blue-500 hover:text-white hover:bg-red-500 hover:border-red-500">
        <Link
          className="p-2 text-lg font-semibold font-mono flex items-center justify-center"
          to={`category/${categoryRoute}`}
        >
          {categoryLink}
          <IonIcon
            icon={arrowForward}
            style={{ fontSize: "1.5rem", marginLeft: ".9rem" }}
          />
        </Link>
      </div>
    </div>
  );
}
