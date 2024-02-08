import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductModal from "./ProductModal";
import { IonIcon } from "@ionic/react";
import {
  star,
  starHalfOutline,
  bagHandleOutline,
  heartOutline,
  eyeOutline,
} from "ionicons/icons";
import classes from "./ProductItemCard.module.css";

function PRODUCT_RATING(stars) {
  const fullStars = Math.floor(stars); // Get the integer part of the rating
  const halfStar = stars - fullStars >= 0.5; // Check if there is a half star

  let starsArray = [];

  for (let i = 0; i < fullStars; i++) {
    starsArray.push(<IonIcon icon={star} key={i} />);
  }

  if (halfStar) {
    starsArray.push(<IonIcon icon={starHalfOutline} key="half" />); // Assuming there's a half-star icon available
  }

  const remainingStars = 5 - starsArray.length; // Calculate the remaining empty stars

  for (let i = 0; i < remainingStars; i++) {
    starsArray.push(<IonIcon icon={star} key={`empty-${i}`} />);
  }

  return <div>{starsArray}</div>;
}

export default function ProductItemCard(props) {
  const [openProductModal, setOpenProductModal] = useState(false);
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const handleMouseOver = () => {
    setMouseIsOver(true);
  };
  const handleMouseOut = () => {
    setMouseIsOver(false);
  };

  const {
    title,
    price,
    id,
    category,
    description,
    brand,
    discountPercentage,
    rating,
    stock,
    images,
    thumbnail,
  } = props.productData || [];

  function handleShowProductModal() {
    setOpenProductModal(!openProductModal);
  }
  const getName = (title) => {
    const MAX_NAME_CHARS = 30;
    if (title.length > MAX_NAME_CHARS) {
      return `${title.slice(0, MAX_NAME_CHARS)}...`;
    }
    return title;
  };

  function CONVERT_CURRENCY(priceInUSD) {
    const EXCHANGE_RATE = 608.58;
    const XAF_PRICE = Math.round(priceInUSD * EXCHANGE_RATE);
    const FORMATE_PRICE = XAF_PRICE;
    return FORMATE_PRICE;
  }

  const XAF_PRICE = CONVERT_CURRENCY(price);

  function DISCOUNT_PRICE(discountPercentage, price) {
    const discount = (discountPercentage / 100) * price;
    const discountedPrice = Math.round(price - discount);
    return discountedPrice;
  }
  const originalPrice = XAF_PRICE;
  const percentage = discountPercentage;
  const FINAL_PRICE = DISCOUNT_PRICE(percentage, originalPrice);

  const PRODUCT_PRICE = CONVERT_CURRENCY(price) + " XAF";
  const DISCOUNT = FINAL_PRICE + " XAF";

  const PRODUCT_MODAL = (
    <ProductModal>
      <div className="flex items-center gap-8 p-6">
        <div>
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="object-fill"
          />
        </div>
        {/* Product Information */}
        <div>
          <div>
            <p>{brand}</p>
            <p>{category}</p>
            <p className="font-mono">{title}</p>
            <p>{DISCOUNT}</p>
            <p className="font-mono">{PRODUCT_PRICE}</p>
            <p>{discountPercentage}%</p>
          </div>
          <div className="mt-4">
            <p className="font-mono">{description}</p>
            <div className="flex items-center">
              {PRODUCT_RATING(rating)}
              <span>({stock})</span>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                className="border-red-500 p-1 mr-4 font-semibold
                    rounded hover:bg-red-500 hover:text-white 
                  transition:ease-out duration-1000
                  border-2 flex items-center text-red-500"
              >
                <IonIcon
                  icon={bagHandleOutline}
                  className="mr-2"
                  style={{ fontSize: "1.5rem" }}
                />
                Buy
              </button>
              <button
                className="border-red-500 p-1 mr-4 font-semibold
                    rounded hover:bg-red-500 hover:text-white 
                  transition:ease-out duration-1000
                  border-2 flex items-center text-red-500"
              >
                <IonIcon
                  icon={heartOutline}
                  className="mr-2"
                  style={{ fontSize: "1.5rem" }}
                />
                Wish List
              </button>
            </div>
          </div>
          <div className="flex flex-row-reverse mx-4 mt-4 items-center ">
            <button
              onClick={handleShowProductModal}
              className="text-white bg-red-500 p-2 rounded"
            >
              Close
            </button>

            <Link
              to={`/product-details/${id}/${title}`}
              className="border-red-500 p-1 mr-4 font-semibold
                  rounded hover:bg-red-500 hover:text-white 
                  transition:ease-out duration-1000
                  border-2 flex items-center text-red-500"
            >
              <IonIcon
                icon={eyeOutline}
                style={{ fontSize: "1.5rem" }}
                className="mr-2"
              />
              View
            </Link>
          </div>
        </div>
      </div>
    </ProductModal>
  );

  return (
    <button
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      loading="lazy"
    >
      <div
        id={id}
        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
      >
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 grid justify-start font-semibold">
        <div>
          <p className="flex justify-start text-gray-700">{brand}</p>

          <h4 className="font-mono text-lg flex text-left">
            <span aria-hidden="true">{getName(title)}</span>
          </h4>
        </div>
        <div className="text-left text-lg">
          <p className="text-red-600">{DISCOUNT}</p>
          <p className="text-red-600">
            Up to ${discountPercentage}% off for this item
          </p>

          <p className="line-through tracking-wide font-medium">
            {PRODUCT_PRICE}
          </p>

          <div className="flex items-center">
            {PRODUCT_RATING(rating)}
            <span className="ml-2">({stock})</span>
          </div>
        </div>
      </div>

      <button
        className={`mt-10 ${
          mouseIsOver
            ? `${classes.animateSlideIn}`
            : `${classes.animateSlideOut}`
        } text-white py-2 px-6 rounded-sm font-medium text-lg bg-gray-700 w-full`}
        onClick={handleShowProductModal}
      >
        Quick View
      </button>
      {openProductModal && PRODUCT_MODAL}
    </button>
  );
}
