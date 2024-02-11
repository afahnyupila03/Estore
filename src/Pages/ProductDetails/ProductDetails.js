import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import React from "react";
import { getFeaturedProductService } from "../../Services/HomeService";
import { CategoryServiceItem } from "../../Services/CategoryService";
import UseAnimation from "../../Components/Loader";
import Icon from "../../Components/Icon";
import { bagOutline, heartOutline, reloadOutline } from "ionicons/icons";
import loading from "react-useanimations/lib/loading";
import { star, starHalfOutline } from "ionicons/icons";

function PRODUCT_RATINGS(stars) {
  const fullStars = Math.floor(stars);
  const halfStar = stars - fullStars > -0.5;

  let starsArray = [];

  for (let i = 0; i < fullStars; i++) {
    starsArray.push(<Icon icon={star} key={i} />);
  }

  if (halfStar) {
    starsArray.push(<Icon icon={starHalfOutline} key="half" />); // Assuming there's a half-star icon available
  }

  const remainingStars = 5 - starsArray.length; // Calculate the remaining empty stars

  for (let i = 0; i < remainingStars; i++) {
    starsArray.push(<Icon icon={star} key={`empty-${i}`} />);
  }

  return <div>{starsArray}</div>;
}

export default function ProductDetails() {
  const { id: featId, title: featTitle, shopId, shopTitle } = useParams();

  const {
    data: {
      id,
      images = [],
      title,
      price,
      description,
      category,
      thumbnail,
      brand,
      discountPercentage,
      rating,
      stock,
    } = [],
    isLoading,
    error,
    refetch,
  } = useQuery("product", () => {
    if ((shopId, shopTitle)) {
      return CategoryServiceItem(shopId, shopTitle);
    } else if ((featId, featTitle)) {
      return getFeaturedProductService(featId, featTitle);
    }
  });

  function CONVERT_CURRENCY(priceInUSD) {
    const exchangeRate = 608.58;
    const convertedPrice = Math.round(priceInUSD * exchangeRate);
    const discount = convertedPrice;
    return discount;
  }

  const XAF_PRICE = CONVERT_CURRENCY(price);

  function formatMoney(amount, currency) {
    const formatter = new Intl.NumberFormat("fr", {
      style: "currency",
      currency: currency,
    });

    return formatter.format(amount);
  }

  function DISCOUNT_PRICE(discountPercentage, price) {
    const discount = (discountPercentage / 100) * price;
    const discountedPrice = Math.round(price - discount);
    return discountedPrice;
  }

  const CURRENCY = "XAF";

  const originalPrice = XAF_PRICE;
  const percentage = discountPercentage;
  const FINAL_PRICE = DISCOUNT_PRICE(percentage, originalPrice);
  const PRODUCT_PRICE = formatMoney(CONVERT_CURRENCY(price), CURRENCY);

  const DISCOUNT = formatMoney(FINAL_PRICE, CURRENCY);

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
        <p>{id}</p>
        <div>
          <div className="grid grid-cols-2 gap-x-20">
            <div className="grid grid-cols-2 w-full h-full gap-x-1 gap-y-4">
              <img src={thumbnail} className="w-full h-full" alt={title} />
              {images.map((image) => (
                <img src={image} className="w-full h-full" />
              ))}
            </div>
            <div>
              <div className="mt-4">
                <p className="flex items-center">
                  {PRODUCT_RATINGS(rating)}{" "}
                  <span className="ml-2">({stock})</span>
                </p>
                <p>{title}</p>
                <p className="underline">{brand}</p>
              </div>

              <div className="mt-4">
                <p className="text-red-600">{DISCOUNT}</p>
                <p className="text-red-600">
                  -{discountPercentage}% off for this item
                </p>

                <p className="line-through">{PRODUCT_PRICE}</p>
              </div>

              <div className="mt-4">
                <p>{description}</p>
              </div>

              <div className="grid justify-center">
                <button className="font-semibold text-lg flex items-center sm:w-full px-20 py-5 text-white rounded bg-black">
                  <Icon
                    style={{
                      fontSize: "1.5rem",
                      color: "white",
                      marginRight: "1rem",
                    }}
                    icon={bagOutline}
                  />
                  Add to Bag
                </button>
                <button className="font-semibold text-lg flex items-center mt-6 sm:w-full px-20 py-5 text-white rounded bg-black">
                  <Icon
                    style={{
                      fontSize: "1.5rem",
                      color: "white",
                      marginRight: ".7rem",
                    }}
                    icon={heartOutline}
                  />
                  Add to Wish List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 text-lg">
      <div>{productDetail}</div>

      <hr className=" mt-20 w-full border-1 border-gray-400" />

      <h1 className="mt-20">Recommended for You</h1>
    </div>
  );
}
