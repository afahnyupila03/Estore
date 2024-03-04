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
    starsArray.push(<Icon icon={starHalfOutline} key="half" />);
  }

  const remainingStars = 5 - starsArray.length;

  for (let i = 0; i < remainingStars; i++) {
    starsArray.push(<Icon icon={star} key={`empty-${i}`} />);
  }

  return <div>{starsArray}</div>;
}

export default function ProductDetails() {
  const { id: featId, title: featTitle, shopId, shopTitle } = useParams();

  const {
    data: productDetailsItems = [],
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

  const {
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
  } = productDetailsItems || {};

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
  // const PRODUCT_PRICE = formatMoney(CONVERT_CURRENCY(price), CURRENCY);

  const DISCOUNT = formatMoney(FINAL_PRICE, CURRENCY);

  let productDetail;

  if (isLoading) {
    productDetail = (
      <div className="flex m-40 justify-center">
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
      <>
        {/* Product Gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          {images.map((imageItems) => (
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={imageItems}
                alt={imageItems.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {title}
            </h1>
          </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{DISCOUNT}</p>

            <div className="mt-6">
              <div className="flex items-center">
                <div className="flex items-center">
                  {PRODUCT_RATINGS(rating)}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert("Product added." + " " + title)}
              className="mt-10 flex w-full items-center justify-center rounded-md bg-gray-600 px-8 py-3 text-base font-medium text-white"
            >
              Add to bag
            </button>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">{brand}</p>
                  <p>{category}</p>
                </div>
                <p className="text-base text-gray-900">{description}</p>
              </div>
            </div>

            <div className="mt-4">
              <p>{stock} available in stock</p>
            </div>
          </div>
        </div>

        {/* RETHINK THIS SECTION AND CODE LOGIC */}
        <div className="mx-auto px-8">
          <h1 className="font-medium tracking-wide uppercase">
            customers also purchased
          </h1>
        </div>
      </>
    );

    /* productDetail = (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <div>
          <div className="flex row-reverse justify-between grid-cols-1 lg:grid-cols-2 lg:col">
            <div className="grid grid-cols-2 w-full h-full gap-x-1 gap-y-4">
              {images.map((image) => (
                <img src={image} className="w-full h-full" />
              ))}
            </div>
            <div className="text-2xl font-mono">
              <div className="mt-4">
                <p className="flex items-center">
                  {PRODUCT_RATINGS(rating)}{" "}
                  <span className="ml-2">({stock})</span>
                </p>
                <p className="font-semibold">{title}</p>
                <p className="underline">{brand}</p>
              </div>

              <div className="mt-4">
                <p className="text-red-600">{DISCOUNT}</p>
                <p className="text-red-600">
                  {discountPercentage}% off for this item
                </p>

                <p className="line-through">{PRODUCT_PRICE}</p>
              </div>

              <div className="mt-4">
                <p>{description}</p>
              </div>

              <div className="grid mt-8 justify-center">
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
    ); */
  }

  return (
    <div className="container mx-auto px-4 text-lg">
      <div>{productDetail}</div>
    </div>
  );
}
