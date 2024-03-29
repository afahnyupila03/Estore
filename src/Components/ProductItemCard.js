import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductModal from "./ProductModal";
import { IonIcon } from "@ionic/react";
import {
  star,
  starHalfOutline,
  bagHandleOutline,
  add,
  closeOutline,
  chevronBackOutline,
  chevronForwardOutline,
  checkmark,
  heart,
  heartDislike,
} from "ionicons/icons";
import classes from "./ProductItemCard.module.css";
import Icon from "./Icon";
import { useAuth, useCart, useWishList } from "../Store";
import { database, realTimeDatabase } from "../FirebaseConfigs/Firesbase";
import { ref, set } from "firebase/database";
import { addDoc, collection } from "firebase/firestore";
import { useQuery } from "react-query";
import { WishListPostItemsServices } from "../Services/CartService";

function PRODUCT_RATING(stars) {
  const fullStars = Math.floor(stars);
  const halfStar = stars - fullStars >= 0.5;

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

export default function ProductItemCard({ productData }) {
  const [openProductModal, setOpenProductModal] = useState(false);
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [currImageIndex, setCurrImageIndex] = useState(0);
  const [productAdded, setProductAdded] = useState(false);

  const { addProductHandler } = useCart();
  const { user } = useAuth();
  const { addProductToWishList, wishListed, removeProductFromWishList } =
    useWishList();

  const [wishList, setWishList] = useState(wishListed);

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
    quantity,
  } = productData || [];

  const userId = user?.uid;

  const handleMouseOver = () => {
    setMouseIsOver(true);
  };
  const handleMouseOut = () => {
    setMouseIsOver(false);
  };
  const handleImageClick = (index) => {
    setCurrImageIndex(index);
  };

  function handleShowProductModal() {
    setOpenProductModal(!openProductModal);
  }
  const getName = (title) => {
    const MAX_NAME_CHARS = 15;
    if (title.length > MAX_NAME_CHARS) {
      return `${title.slice(0, MAX_NAME_CHARS)}...`;
    }
    return title;
  };

  const handleUserAuthState = () => {
    handleShowProductModal();
    setTimeout(() => {
      window.location.replace("/sign-in-&-create-account");
    }, 1000);
  };

  function CONVERT_CURRENCY(priceInUSD) {
    const exchangeRate = 608.58;
    const convertedPrice = Math.round(priceInUSD * exchangeRate);
    const discount = convertedPrice;
    return discount;
  }

  const XAF_PRICE = CONVERT_CURRENCY(price);

  function DISCOUNT_PRICE(discountPercentage, price) {
    const discount = (discountPercentage / 100) * price;
    const discountedPrice = Math.round(price - discount);
    return discountedPrice;
  }
  function formatMoney(amount, currency) {
    const formatter = new Intl.NumberFormat("fr", {
      style: "currency",
      currency: currency,
    });

    return formatter.format(amount);
  }
  const CURRENCY = "XAF";

  const originalPrice = XAF_PRICE;
  const percentage = discountPercentage;
  const FINAL_PRICE = DISCOUNT_PRICE(percentage, originalPrice);

  const PRODUCT_PRICE = formatMoney(CONVERT_CURRENCY(price), CURRENCY);
  const DISCOUNT = formatMoney(FINAL_PRICE, CURRENCY);

  const handleAddProduct = (product) => {
    if (user === null) {
      handleUserAuthState();
    } else {
      addProductHandler(product);
      setProductAdded(true);

      setTimeout(() => {
        setProductAdded(false);
      }, 200);
    }
  };

  const handleWishListedProducts = async (data) => {
    if (user === null) {
      handleUserAuthState();
    } else {
      // const db = realTimeDatabase;
      const db = database;
      const listRef = collection(db, userId, "/wishlist/", "products");
      const listId = listRef.key;
      try {
        await addProductToWishList(data);

        const wishData = await addDoc(listRef, data);

        setWishList(!wishList);

        console.log("wishList item: ", wishData);
        console.log("WishList id: ", listId);
        alert("Product to wishlist store");
      } catch (error) {
        alert("error adding to wishlist store: ", error);
        console.error(error);
      }
    }
  };

  const handleDisLikedProducts = (id) => {
    setWishList(!wishList);
    removeProductFromWishList(id);
  };

  const handleItemClick = (event) => {
    if (window.innerWidth <= 767) {
      event.preventDefault();
      window.location.href = `/product-details/${id}/${title}`;
    } else {
      // handleShowProductModal();31
    }
  };

  const PRODUCT_MODAL = (
    <ProductModal
      icon={closeOutline}
      style={{ fontSize: "2rem", fontWeight: "bold" }}
      actionHandler={handleShowProductModal}
    >
      <div className="grid grid-cols-2 gap-x-10 font-mono text-2xl font-medium px-6">
        <div>
          <img
            src={currImageIndex !== null ? images[currImageIndex] : thumbnail}
            alt={title}
            loading="lazy"
            className="object-fill h-80 rounded w-full"
          />
          <div className="flex items-center justify-center mt-4">
            <Icon
              icon={chevronBackOutline}
              actionButton={() =>
                handleImageClick(
                  (currImageIndex - 1 + images.length) % images.length
                )
              }
            />
            <span className="mx-2">
              {`${currImageIndex + 1}/${images.length}`}
            </span>
            <Icon
              icon={chevronForwardOutline}
              actionButton={() =>
                handleImageClick((currImageIndex + 1) % images.length)
              }
            />
          </div>
        </div>
        {/* Product Information */}
        <div className="text-lg">
          <div className="flex flex-col justify-start">
            <p className="flex">
              {PRODUCT_RATING(rating)} <span className="ml-2">({stock})</span>
            </p>
            <Link
              to={`/product-details/${id}/${title}`}
              className="hover:underline"
            >
              {title}
            </Link>
            <p>{brand}</p>

            <p>{DISCOUNT}</p>
          </div>
          <div className="mt-6">
            <p className="font-mono text-1xl font-medium">{description}</p>

            <div className="grid justify-start mt-8 ">
              <button
                onClick={() => handleAddProduct(productData)}
                className="bg-black flex px-8 py-2 rounded mb-2 text-white font-medium font-mono items-center text-center"
              >
                <IonIcon
                  icon={productAdded ? checkmark : bagHandleOutline}
                  className="mr-2"
                  style={{ fontSize: "1.5rem" }}
                />
                {productAdded ? "Added" : "Add to Bag"}
              </button>
              <button
                onClick={
                  wishList
                    ? () => handleDisLikedProducts(id)
                    : () => handleWishListedProducts(productData)
                }
                className="underline flex items-center"
              >
                <IonIcon
                  icon={wishList ? heartDislike : add}
                  className="mr-1"
                  style={{ fontSize: "1.5rem" }}
                />
                {wishList ? "Dislike" : "Wish List"}
              </button>
            </div>
          </div>
          <div className="flex justify-center mx-4 mt-4 items-center ">
            <Link
              to={`/product-details/${id}/${title}`}
              className="underline text-lg"
            >
              See full details
            </Link>
          </div>
        </div>
      </div>
    </ProductModal>
  );

  return (
    <button
      loading="lazy"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleItemClick}
    >
      <div
        id={id}
        className="aspect-h-1 aspect-w-1 lg:w-full overflow-hidden rounded-md bg-red-200 lg:aspect-none group-hover:opacity-75 h-80"
      >
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>

      <div className="mt-4 text-xs lg:text-lg grid font-semibold">
        <div className="flex justify-between items-center">
          <div>
            <p className="flex text-xs lg:text-lg justify-start text-gray-700">
            {brand}
          </p>

            <h4 className="font-mono text-sm font-semibold lg:font-semibold lg:text-lg flex text-left">
              <span aria-hidden="true">{getName(title)}</span>
            </h4>
          </div>
          {wishList && (
            <div>
              <IonIcon icon={heart} style={{ fontSize: "1.5rem" }} />
            </div>
          )}
        </div>
        <div className="text-left text-sm lg:text-lg">
          <p className="text-red-600">{DISCOUNT}</p>
          <p className="text-red-600">
            -{discountPercentage}% off for this item
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

      <div className="mt-2">
        <button
          className={`${
            mouseIsOver
              ? `${classes.animateSlideIn}`
              : `${classes.animateSlideOut}`
          } text-white py-2 px-6 rounded-sm font-medium text-lg bg-gray-700 w-full`}
          onClick={handleShowProductModal}
        >
          Quick view
        </button>
      </div>

      {openProductModal && PRODUCT_MODAL}
    </button>
  );
}
