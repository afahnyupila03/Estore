import React from "react";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { arrowForward } from "ionicons/icons";

export default function ProductCategoryCardItem({ categoryData }) {
  const { categoryRoute, categoryLink, categoryImage, categoryImageText } =
    categoryData;

  return (
    <div>
      <div>
        <Link to={`category/${categoryRoute}`}>
          <div>
            <img
              src={categoryImage}
              alt={categoryImageText}
              className="object-cover h-48 w-96"
            />
          </div>
            <Link
              className="p-4 text-lg font-semibold flex items-center justify-center "
              to={`category/${categoryRoute}`}
            >
              {categoryLink}
              <IonIcon
                icon={arrowForward}
                style={{ fontSize: "1.5rem", marginLeft: ".9rem" }}
              />
            </Link>
        </Link>
      </div>
    </div>
  );
}
