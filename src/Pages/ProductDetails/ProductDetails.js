import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
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

  const handleUserAuthState = useCallback(() => {
    setTimeout(() => {
      window.location.replace("/sign-in-&-create-account");
    }, 1000);
  }, []);

  const handleAddProduct = useCallback(
    (data) => {
      if (user === null) {
        handleUserAuthState();
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
        handleUserAuthState();
      } else {
        addProductToWishList(data);
        setWishList(!wishList);
      }
    },
    [user, addProductToWishList, wishList, handleUserAuthState]
  );

  const handleDisLikedProducts = useCallback(
    (id) => {
      setWishList(!wishList);
      removeProductFromWishList(id);
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
          Product Information
        </dt>
        <dd className="mt-2 text-lg text-gray-800">
          Category: {data.category}
        </dd>
        <dd className="mt-2 text-lg text-gray-800">Brand: {data.brand}</dd>
        <dd className="mt-2 text-lg text-gray-800">
          Tags: {data.tags.join(", ")}
        </dd>
      </div>

      {/* PRODUCT PRICE INFORMATION */}
      <div className="border-t border-gray-200 pt-4">
        <dt className="font-medium text-xl text-gray-900">Product Price</dt>
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
          Minimum order quantity: {data.minimumOrderQuantity}
        </dd>
      </div>
    </dl>
  );

  const renderProductDimensionsAndPrice = (data) => (
    <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
      {/* PRODUCT DIMENSIONS */}
      <div className="border-t border-gray-200 pt-4">
        <dt className="font-medium text-xl text-gray-900">
          Product Dimensions
        </dt>
        <dd className="mt-2 text-lg text-gray-800">Weight: {data.weight}</dd>
        {data.dimensions && (
          <>
            <dd className="mt-2 text-lg text-gray-800">
              Width: {`${data.dimensions.width} Kg`}
            </dd>
            <dd className="mt-2 text-lg text-gray-800">
              Height: {`${data.dimensions.height} Cm`}
            </dd>
            <dd className="mt-2 text-lg text-gray-800">
              Depth: {`${data.dimensions.depth} Ft`}
            </dd>
          </>
        )}
      </div>

      {/* WARRANTY INFORMATION */}
      <div className="border-t border-gray-200 pt-4">
        <dt className="font-medium text-xl text-gray-900">
          Warranty Information
        </dt>
        <dd className="mt-2 text-lg text-gray-800">
          Warranty: {data.warrantyInformation}
        </dd>
        <dd className="mt-2 text-lg text-gray-800">
          Shipping information: {data.shippingInformation}
        </dd>
        <dd className="mt-2 text-lg text-gray-800">
          Return Policy: {data.returnPolicy}
        </dd>
      </div>
    </dl>
  );

  const renderProductMetaDataAndActionButtons = (data) => (
    <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
      {/* META-DATA */}
      <div className="border-t border-gray-200 pt-4">
        <dt className="font-medium text-xl text-gray-900">Product Meta-data</dt>
        <dd className="mt-2 text-lg text-gray-800">Sku: {data.sku}</dd>
        {data.meta && (
          <>
            <dd className="mt-2 text-lg text-gray-800">
              Bar-code: {data.meta.barcode}
            </dd>
            <dd className="mt-2 text-lg text-gray-800">
              <div className="flex justify-between">
                <div>QRCode:</div>
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
            className="font-medium text-lg flex justify-center my-4 py-2 items-center sm:w-full text-white rounded bg-gray-900"
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
            className="font-medium text-lg flex justify-center my-4 py-2 items-center sm:w-full text-white rounded bg-gray-900"
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
            {renderProductDimensionsAndPrice(data)}
            {renderProductMetaDataAndActionButtons(data)}
          </div>
          {renderProductImages(data)}
        </div>
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
