import { useState } from "react";
import ProductModal from "./ProductModal";
import { IonIcon } from "@ionic/react";
import { star, starHalfOutline } from "ionicons/icons";

export default function ProductItemCard (props) {
  const [openProductModal, setOpenProductModal] = useState(false);

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
    const EXCHANGE_RATE = 608.58; // Assuming 1 USD = 100 XCAF
    const XAF_PRICE = Math.round(priceInUSD * EXCHANGE_RATE); // Convert the price to XCAF
    const FORMATE_PRICE = XAF_PRICE
    return FORMATE_PRICE; // Return the price in XCAF
  }

  const XAF_PRICE = CONVERT_CURRENCY(price)

  function DISCOUNT_PRICE(discountPercentage, price) {
    const discount = (discountPercentage / 100) * price; // Calculate the discount amount
    const discountedPrice = Math.round(price - discount); // Calculate the discounted price
    return discountedPrice; // Return the discounted price
  }
  const originalPrice = XAF_PRICE;
  const percentage = discountPercentage;
  const FINAL_PRICE = DISCOUNT_PRICE(percentage, originalPrice);

  const PRODUCT_PRICE = CONVERT_CURRENCY(price) + " XAF";
  const DISCOUNT = FINAL_PRICE + ' XAF'

  return (
    <button loading="lazy">
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

          {/* <p className="mt-1 flex justify-start text-sm font-mono text-gray-500">
            {category}
          </p> */}
        </div>
        <div className="text-left text-lg">
          <p className="text-red-600">
            {DISCOUNT}
          </p>
          <p className="text-red-600">Up to ${discountPercentage}% off for this item</p>

          <p className="line-through tracking-wide font-medium">
            {PRODUCT_PRICE}
          </p>

          <div className="flex items-center">
            {/* <IonIcon icon={starOutline} className="mr-2" /> */}
            {PRODUCT_RATING(rating)}
            <span className="ml-2">({stock})</span>
          </div>
        </div>
      </div>

      <button
        className="mt-10 visible hover:invisible text-red-500"
        onClick={handleShowProductModal}
      >
        Quick View
      </button>
      {openProductModal && (
        <ProductModal
          images={images}
          name={title}
          id={id}
          thumbnail={thumbnail}
          price={price}
          discount={discountPercentage}
          rating={rating}
          category={category}
          brand={brand}
          stock={stock}
          description={description}
          actionButton="Close Modal"
          onCloseModal={handleShowProductModal}
        />
      )}
    </button>
  );
}
