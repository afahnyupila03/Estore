import React, { useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
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
import { t } from "i18next";
import Slider from "react-slick";
import ReviewCard from "./components/ReviewCard";

function PRODUCT_RATINGS(stars) {
  const fullStars = Math.floor(stars);
  const halfStar = stars - fullStars >= 0.5;
  const starsArray = [];

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    starsArray.push(<Icon icon={star} key={`full-${i}`} />);
  }

  // Add half star if needed
  if (halfStar) {
    starsArray.push(<Icon icon={starHalfOutline} key="half" />);
  }

  return <div>{starsArray}</div>;
}

function CONVERT_CURRENCY(priceInUSD) {
  const exchangeRate = 608.58;
  return Math.round(priceInUSD * exchangeRate);
}

function DISCOUNT_PRICE(discountPercentage, price) {
  const discount = (discountPercentage / 100) * price;
  return Math.round(price - discount);
}

function formatMoney(amount, currency) {
  const formatter = new Intl.NumberFormat("fr", {
    style: "currency",
    currency: currency,
  });

  return formatter.format(amount);
}

function ProductDetails() {
  const { user } = useAuth();
  const { addProductHandler } = useCart();
  const { addProductToWishList, wishListed, removeProductFromWishList } =
    useWishList();

  const location = useLocation();
  const navigate = useNavigate();

  const [productAdded, setProductAdded] = useState(false);
  const [wishList, setWishList] = useState(wishListed);

  const { id: featId, title: featTitle, shopId, shopTitle } = useParams();

  const { data, isLoading, error, refetch } = useQuery(
    ["product", featId, featTitle, shopId, shopTitle],
    () =>
      shopId && shopTitle
        ? CategoryServiceItem(shopId, shopTitle)
        : getFeaturedProductService(featId, featTitle),
    { enabled: !!featId || !!shopId }
  );

  const XAF_PRICE = CONVERT_CURRENCY(data?.price);
  const FINAL_PRICE = DISCOUNT_PRICE(data?.discountPercentage, XAF_PRICE);
  const DISCOUNT = formatMoney(FINAL_PRICE, "XAF");

  const handleUserAuthState = useCallback((action, data) => {
    navigate("/sign-in-&-create-account", {
      state: { from: location, action: action, data },
    });
  }, []);

  const handleAddProduct = useCallback(
    (data) => {
      if (user === null) {
        handleUserAuthState("addProduct", data);
      } else {
        addProductHandler(data);
        setProductAdded(true);
        setTimeout(() => {
          setProductAdded(false);
        }, 1000);
      }
    },
    [user, addProductHandler, handleUserAuthState]
  );

  const handleWishListedProduct = useCallback(
    (data) => {
      if (user === null) {
        handleUserAuthState("wishlist", data);
      } else {
        addProductToWishList(data);
        setWishList(!wishList);
      }
    },
    [user, addProductToWishList, wishList, handleUserAuthState]
  );

  const handleDisLikedProducts = useCallback(
    (id) => {
      if (user === null) {
        handleUserAuthState("removeWishlist", id);
      } else {
        setWishList(!wishList);
        removeProductFromWishList(id);
      }
    },
    [wishList, removeProductFromWishList]
  );

  const renderLoading = () => (
    <div className="flex m-40 justify-center">
      <UseAnimation animation={loading} size={100} />
    </div>
  );

  const renderError = () => (
    <div className="flex justify-center">
      <Icon
        icon={reloadOutline}
        style={{ fontSize: "7rem" }}
        actionButton={() => refetch()}
      />
    </div>
  );

  const renderProductInfoAndPrice = (data) => (
    <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
      {/* PRODUCT INFORMATION */}
      <div className="border-t border-gray-200 pt-4">
        <dt className="font-medium text-xl text-gray-900">
          {t("productDetails.productInformation")}
        </dt>
        <dd className="mt-2 text-lg text-gray-800">
          {t("productDetails.category")}: {data.category}
        </dd>
        <dd className="mt-2 text-lg text-gray-800">
          {t("productDetails.brand")}: {data.brand}
        </dd>
        <dd className="mt-2 text-lg text-gray-800">
          {t("productDetails.tags")}: {data.tags.join(", ")}
        </dd>
      </div>

      {/* PRODUCT PRICE INFORMATION */}
      <div className="border-t border-gray-200 pt-4">
        <dt className="font-medium text-xl text-gray-900">
          {t("productDetails.productPrice")}
        </dt>
        <dd className="mt-2 text-lg text-gray-800">{DISCOUNT}</dd>
        <dd className="mt-2 text-lg text-gray-800">
          <span className="line-through">{formatMoney(XAF_PRICE, "XAF")}</span>
        </dd>
        <dd className="mt-2 text-lg text-gray-800">
          {PRODUCT_RATINGS(data.rating)}
        </dd>
        <dd className="mt-2 text-lg text-gray-800">
          {t("inStock")}: {data.stock}
        </dd>
        <dd className="mt-2 text-lg text-gray-800">
          {t("productDetails.minimumOrder")}: {data.minimumOrderQuantity}
        </dd>
      </div>
    </dl>
  );

  const renderProductDimensionsAndWarranty = (data) => (
    <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
      {/* PRODUCT DIMENSIONS */}
      <div className="border-t border-gray-200 pt-4">
        <dt className="font-medium text-xl text-gray-900">
          {t("productDetails.productDimension")}
        </dt>
        <dd className="mt-2 text-lg text-gray-800">Weight: {data.weight}</dd>
        {data.dimensions && (
          <>
            <dd className="mt-2 text-lg text-gray-800">
              {t("productDetails.width")}: {`${data.dimensions.width} Kg`}
            </dd>
            <dd className="mt-2 text-lg text-gray-800">
              {t("productDetails.height")}: {`${data.dimensions.height} Cm`}
            </dd>
            <dd className="mt-2 text-lg text-gray-800">
              {t("productDetails.depth")}: {`${data.dimensions.depth} Ft`}
            </dd>
          </>
        )}
      </div>

      {/* WARRANTY INFORMATION */}
      <div className="border-t border-gray-200 pt-4">
        <dt className="font-medium text-xl text-gray-900">
          {t("productDetails.WarrantyInformation")}
        </dt>
        <dd className="mt-2 text-lg text-gray-800">
          {t("productDetails.warranty")}: {data.warrantyInformation}
        </dd>
        <dd className="mt-2 text-lg text-gray-800">
          {t("productDetails.shippingInformation")}: {data.shippingInformation}
        </dd>
        <dd className="mt-2 text-lg text-gray-800">
          {t("productDetails.returnPolicy")}: {data.returnPolicy}
        </dd>
      </div>
    </dl>
  );

  const renderProductMetaDataAndActionButtons = (data) => (
    <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
      {/* META-DATA */}
      <div className="border-t border-gray-200 pt-4">
        <dt className="font-medium text-xl text-gray-900">
          {t("productDetails.productMeta")}
        </dt>
        <dd className="mt-2 text-lg text-gray-800">Sku: {data.sku}</dd>
        {data.meta && (
          <>
            <dd className="mt-2 text-lg text-gray-800">
              {t("productDetails.barCode")}: {data.meta.barcode}
            </dd>
            <dd className="mt-2 text-lg text-gray-800">
              <div className="flex justify-between">
                <div>{t("productDetails.qrCode")}:</div>
                <div>
                  <img src={data.meta.qrCode} alt={data.meta.qrCode} />
                </div>
              </div>
            </dd>
          </>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="border-t border-gray-200 pt-4">
        <dd className="mt-2">
          <button
            onClick={() =>
              handleAddProduct({
                title: data.title,
                id: data.id,
                thumbnail: data.thumbnail,
                price: data.price,
                discountPercentage: data.discountPercentage,
                quantity: data.quantity,
              })
            }
            className="font-medium text-lg flex justify-center my-4 mx-4 py-2 px-2 text-center items-center sm:w-full text-white rounded bg-gray-900"
          >
            <Icon
              style={{
                fontSize: "1.5rem",
                color: "white",
                marginRight: "1rem",
              }}
              icon={productAdded ? checkmark : bagOutline}
            />
            {productAdded ? `${t("home.added")}` : `${t("home.addToBag")}`}
          </button>
        </dd>
        <dd className="mt-2">
          <button
            onClick={
              wishList
                ? () => handleDisLikedProducts(data.id)
                : () =>
                    handleWishListedProduct({
                      title: data.title,
                      id: data.id,
                      thumbnail: data.thumbnail,
                      price: data.price,
                      description: data.description,
                      discountPercentage: data.discountPercentage,
                      quantity: data.quantity,
                    })
            }
            className="font-medium text-lg flex justify-center my-4 mx-4 px-2 text-center py-2 items-center sm:w-full text-white rounded bg-gray-900"
          >
            <Icon
              style={{
                fontSize: "1.5rem",
                color: "white",
                marginRight: ".7rem",
              }}
              icon={wishList ? heartDislike : heartOutline}
            />
            {wishList ? `${t("home.dislike")}` : `${t("home.addToWishlist")}`}
          </button>
        </dd>
      </div>
    </dl>
  );

  const renderProductImages = (data) => (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
      {data.images?.map((image) => (
        <img
          key={image}
          src={image}
          alt={image}
          className="rounded-lg bg-gray-900"
        />
      ))}
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const renderReviews = (data) => (
    <>
      <h2 className="text-gray-900 font-medium text-3xl">
        {t("productDetails.productReviews")}
      </h2>
      <Slider {...settings}>
        {data.reviews?.map((reviews, index) => (
          <div key={index} className="p-4">
            <ReviewCard reviewCard={reviews} />
          </div>
        ))}
      </Slider>
    </>
  );

  const renderProductDetails = () => {
    if (isLoading) {
      return renderLoading();
    }
    if (error) {
      return renderError();
    }
    return (
      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {data.title}
            </h2>
            <p className="mt-4 text-gray-800">{data.description}</p>
            {renderProductInfoAndPrice(data)}
            {renderProductDimensionsAndWarranty(data)}
            {renderProductMetaDataAndActionButtons(data)}
          </div>
          {renderProductImages(data)}
        </div>
        {renderReviews(data)}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 text-lg">
      {renderProductDetails()}
      {/* NEW SECTION  */}
      <div></div>
    </div>
  );
}

export default ProductDetails;
