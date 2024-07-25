import React from "react";
import { IonIcon } from "@ionic/react";
import { star } from "ionicons/icons";

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function renderStars(rating) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <IonIcon
        key={i}
        icon={star}
        className={i < rating ? "text-yellow-500" : "text-gray-300"}
      />
    );
  }
  return stars;
}

const ReviewCard = ({ reviewCard }) => {
  const { reviewerName, reviewerEmail, date, rating, comment } = reviewCard;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <h3 className="text-lg text-white font-semibold">{reviewerName}</h3>
          <p className="text-sm text-white">{reviewerEmail}</p>
        </div>
        <div className="text-sm text-white mt-2 sm:mt-0 sm:ml-4">
          {formatDate(date)}
        </div>
      </div>
      <div className="flex items-center mb-4">{renderStars(rating)}</div>
      <p className="text-white">{comment}</p>
    </div>
  );
};

export default ReviewCard;
