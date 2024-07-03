import React, { useState, useEffect } from "react";
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
import { useTranslation } from "react-i18next";
import UseAnimation from "../Components/Loader";
import loading from "react-useanimations/lib/loading";

function PRODUCT_RATING(stars) {
  const fullStars = Math.floor(stars);
  const halfStar = stars - fullStars >= 0.5;
  const starsArray = [];

  for (let i = 0; i < fullStars; i++) {
    starsArray.push(<Icon icon={star} key={`full-${i}`} />);
  }

  if (halfStar) {
    starsArray.push(<Icon icon={starHalfOutline} key="half" />);
  }

  return <div>{starsArray}</div>;
}

export default function NewProductItemCard({ productData }) {
  const [openProductModal, setOpenProductModal] = useState(false);
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [currImageIndex, setCurrImageIndex] = useState(0);
  const [addingProduct, setAddingProduct] = useState(false);
  const [productAdded, setProductAdded] = useState(false);

  const { t } = useTranslation();

  const { addProductHandler } = useCart();
  const { user } = useAuth();
  const {
    addProductToWishList,
    wishListed,
    removeProductFromWishList,
    setWishListState,
  } = useWishList();

  const [wishList, setWishList] = useState(wishListed);
  const [updatedWishList, setUpdatedWishList] = useState(false);
  const [isInWishList, setIsInWishList] = useState(false);

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
    return convertedPrice;
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
  const discountedPrice = DISCOUNT_PRICE(discountPercentage, price);

  const handleAddProductToCart = async () => {
    if (!userId) {
      handleUserAuthState();
      return;
    }

    const product = {
      id,
      title,
      price,
      images,
      thumbnail,
      brand,
      stock,
      quantity,
      description,
    };

    setAddingProduct(true);

    const cartRef = ref(
      realTimeDatabase,
      `cart/${userId}/${product.id}`
    );

    await set(cartRef, product);

    setAddingProduct(false);
    setProductAdded(true);
    setTimeout(() => {
      setProductAdded(false);
    }, 1000);
  };

  const handleAddToWishList = async () => {
    if (!userId) {
      handleUserAuthState();
      return;
    }

    setUpdatedWishList(true);

    const newProduct = {
      id,
      title,
      price,
      thumbnail,
      images,
      brand,
      stock,
      quantity,
      description,
    };

    await WishListPostItemsServices({
      path: `wishlist/${userId}`,
      product: newProduct,
    });

    addProductToWishList(newProduct);
    setIsInWishList(true);
  };

  const handleRemoveFromWishList = (productId) => {
    removeProductFromWishList(productId);
    setIsInWishList(false);
  };

  useEffect(() => {
    setWishList(wishListed);
  }, [wishListed]);

  useEffect(() => {
    if (wishListed && wishListed.length) {
      const isWishListed = wishListed.some(
        (item) => item.id === productData.id
      );
      setIsInWishList(isWishListed);
    }
  }, [wishListed, productData.id]);

  const handleNavigateToPrevImage = () => {
    setCurrImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNavigateToNextImage = () => {
    setCurrImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className={classes.card}>
        <div
          className={classes.imageContainer}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <Link to={`/product/${id}`}>
            <img
              src={images[currImageIndex]}
              alt={title}
              className={classes.image}
            />
          </Link>
          <button
            className={`${classes.addButton} ${
              addingProduct ? classes.loading : ""
            }`}
            onClick={handleAddProductToCart}
            disabled={addingProduct}
          >
            {addingProduct ? (
              <UseAnimation animation={loading} size={20} />
            ) : productAdded ? (
              <IonIcon icon={checkmark} />
            ) : (
              <IonIcon icon={add} />
            )}
          </button>
          <button
            className={`${classes.wishlistButton} ${
              isInWishList ? classes.wishlisted : ""
            }`}
            onClick={
              isInWishList
                ? () => handleRemoveFromWishList(id)
                : handleAddToWishList
            }
          >
            <IonIcon
              icon={isInWishList ? heartDislike : heart}
              className={classes.wishlistIcon}
            />
          </button>
          <button
            className={classes.imageNavigationButton}
            onClick={handleNavigateToPrevImage}
          >
            <IonIcon icon={chevronBackOutline} />
          </button>
          <button
            className={classes.imageNavigationButton}
            onClick={handleNavigateToNextImage}
          >
            <IonIcon icon={chevronForwardOutline} />
          </button>
        </div>
        <div className={classes.details}>
          <h2 className={classes.title}>{getName(title)}</h2>
          <div className={classes.rating}>
            {PRODUCT_RATING(rating)}
            <span className={classes.stock}>
              {t("in_stock", { count: stock })}
            </span>
          </div>
          <div className={classes.priceContainer}>
            <span className={classes.discountedPrice}>
              {formatMoney(XAF_PRICE, "XAF")}
            </span>
            {discountPercentage > 0 && (
              <span className={classes.originalPrice}>
                {formatMoney(discountedPrice, "XAF")}
              </span>
            )}
          </div>
          <div className={classes.actions}>
            <button
              className={classes.actionButton}
              onClick={() => addProductHandler(productData)}
            >
              <IonIcon icon={bagHandleOutline} />
              {t("add_to_cart")}
            </button>
            <button
              className={classes.actionButton}
              onClick={handleShowProductModal}
            >
              {t("view_product")}
            </button>
          </div>
        </div>
      </div>
      {openProductModal && (
        <ProductModal
          icon={closeOutline}
          style={{ fontSize: "2rem" }}
          actionHandler={handleShowProductModal}
        >
          <div className="product-modal-content">
            <h2 className="product-modal-title">{title}</h2>
            <p className="product-modal-description">{description}</p>
            <div className="product-modal-details">
              <div className="product-modal-price">
                <span className="discounted-price">
                  {formatMoney(XAF_PRICE, "XAF")}
                </span>
                {discountPercentage > 0 && (
                  <span className="original-price">
                    {formatMoney(discountedPrice, "XAF")}
                  </span>
                )}
              </div>
              <div className="product-modal-rating">
                {PRODUCT_RATING(rating)}
              </div>
              <div className="product-modal-stock">
                {t("in_stock", { count: stock })}
              </div>
            </div>
            <div className="product-modal-images">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${title} - ${index}`}
                  className={`product-modal-image ${
                    index === currImageIndex ? "active" : ""
                  }`}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
          </div>
        </ProductModal>
      )}
    </>
  );
}
