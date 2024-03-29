import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import React, { useState } from "react";
import { getFeaturedProductService } from "../../Services/HomeService";
import { CategoryServiceItem } from "../../Services/CategoryService";
import UseAnimation from "../../Components/Loader";
import Icon from "../../Components/Icon";
import {
  bagOutline,
  checkmark,
  heartDislike,
  heartOutline,
  reloadOutline,
} from "ionicons/icons";
import loading from "react-useanimations/lib/loading";
import { star, starHalfOutline } from "ionicons/icons";
import { useAuth, useCart, useWishList } from "../../Store";

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
  const { user } = useAuth();
  const { addProductHandler } = useCart();
  const { addProductToWishList, wishListed, removeProductFromWishList } =
    useWishList();

  const [productAdded, setProductAdded] = useState(false);
  const [wishList, setWishList] = useState(wishListed);

  const { id: featId, title: featTitle, shopId, shopTitle } = useParams();

  const {
    data: {
      id,
      quantity,
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

  const DISCOUNT = formatMoney(FINAL_PRICE, CURRENCY);

  const handleUserAuthState = () => {
    setTimeout(() => {
      window.location.replace("/sign-in-&-create-account");
    }, 1000);
  };

  const handleAddProduct = (data) => {
    if (user === null) {
      handleUserAuthState();
    } else {
      addProductHandler(data);
      setProductAdded(true);
      setTimeout(() => {
        setProductAdded(false);
      }, 1000);
    }
  };

  const handleWishListedProduct = (data) => {
    if (user === null) {
      handleUserAuthState();
    } else {
      addProductToWishList(data);
      setWishList(!wishList);
    }
  };

  const handleDisLikedProducts = (id) => {
    setWishList(!wishList);
    removeProductFromWishList(id);
  };

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
      <div className="mt-10 px-40">
        <div>
          <div className="grid grid-cols-2 gap-x-20">
            <div className="grid grid-cols-2 w-full h-full gap-x-1 gap-y-4">
              {images.map((image) => (
                <img
                  key={image}
                  loading="lazy"
                  src={image}
                  alt={image}
                  className="w-full h-full"
                />
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {title}
              </h1>
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {DISCOUNT}
              </p>

              <div className="mt-6">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {PRODUCT_RATINGS(rating)}
                  </div>
                </div>
              </div>

              <div className="grid mt-8 items-center text-center justify-center">
                <button
                  onClick={() =>
                    handleAddProduct({
                      title,
                      id,
                      thumbnail,
                      price,
                      discountPercentage,
                      quantity,
                    })
                  }
                  className="font-semibold text-lg flex items-center text-center sm:w-full px-20 py-5 text-white rounded bg-black"
                >
                  <Icon
                    style={{
                      fontSize: "1.5rem",
                      color: "white",
                      marginRight: "1rem",
                    }}
                    icon={productAdded ? checkmark : bagOutline}
                  />
                  {productAdded ? "Added" : "Add to Bag"}
                </button>
                <button
                  onClick={
                    wishList
                      ? () => handleDisLikedProducts(id)
                      : () =>
                          handleWishListedProduct({
                            title,
                            id,
                            thumbnail,
                            price,
                            description,
                            discountPercentage,
                            quantity,
                          })
                  }
                  className="font-semibold text-lg flex items-center text-center mt-6 sm:w-full px-20 py-5 text-white rounded bg-black"
                >
                  <Icon
                    style={{
                      fontSize: "1.5rem",
                      color: "white",
                      marginRight: ".7rem",
                    }}
                    icon={wishList ? heartDislike : heartOutline}
                  />
                  {wishList ? "Dislike" : "Add to Wish List"}
                </button>
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
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 text-lg">
      <div>{productDetail}</div>
    </div>
  );
}
