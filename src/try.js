import { Button, Modal } from "flowbite-react";
import { useRef, useState } from "react";

export function ReusableModal({
  isOpen,
  onClose,
  modalHeader,
  modalBody,
  modalFooter,
}) {
  const emailInputRef = useRef(null);

  return (
    <Modal
      show={isOpen}
      size="md"
      popup
      onClose={onClose}
      initialFocus={emailInputRef}
    >
      <Modal.Header>{modalHeader}</Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>{modalFooter}</Modal.Footer>
    </Modal>
  );
}

<ModalComponent
  isOpen={openProductModal}
  position="center"
  onClose={handleShowProductModal}
  size="lg"
  className="mt-8 mx-8 bg-black bg-opacity-75"
  modalBody={
    <div className="grid grid-cols-2 gap-x-10 text-2xl font-medium px-6">
      <div>
        <img
          src={currImageIndex !== null ? images[currImageIndex] : thumbnail}
          alt={title}
          loading="eager"
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
      <div className="text-lg">
        <div className="flex flex-col justify-start">
          <p className="flex">{PRODUCT_RATING(rating)}</p>
          <p>{`${t("inStock")}: ${stock}`}</p>
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
          <p className=" text-1xl font-medium">{description}</p>
          <div className="grid justify-start mt-8 ">
            <button
              onClick={() => handleAddProduct(productData)}
              className="bg-black flex px-8 py-2 rounded mb-2 text-white font-medium items-center text-center"
            >
              <IonIcon
                icon={productAdded ? checkmark : bagHandleOutline}
                className="mr-2"
                style={{ fontSize: "1.5rem" }}
              />
              {productAdded ? `${t("home.added")}` : `${t("home.addToBag")}`}
            </button>
            <button
              onClick={
                isInWishList
                  ? () => handleDisLikedProducts(id)
                  : () => handleWishListedProducts(productData)
              }
              className="underline flex items-center"
            >
              <IonIcon
                icon={isInWishList ? heartDislike : add}
                className="mr-1"
                style={{ fontSize: "1.5rem" }}
              />
              {isInWishList ? `${t("home.dislike")}` : `${t("auth.wishList")}`}
            </button>
          </div>
        </div>
        <div className="flex justify-center mx-4 mt-4 items-center">
          <Link
            to={`/product-details/${id}/${title}`}
            className="underline text-lg"
          >
            {t("home.seeDetails")}
          </Link>
        </div>
      </div>
    </div>
  }
/>;

export default ExampleComponent;

<ProductModal
  icon={closeOutline}
  style={{ fontSize: "2rem", fontWeight: "bold" }}
  actionHandler={handleShowProductModal}
>
  <div className="grid grid-cols-2 gap-x-10 text-2xl font-medium px-6">
    <div>
      <img
        src={currImageIndex !== null ? images[currImageIndex] : thumbnail}
        alt={title}
        loading="eager"
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
        <span className="mx-2">{`${currImageIndex + 1}/${images.length}`}</span>
        <Icon
          icon={chevronForwardOutline}
          actionButton={() =>
            handleImageClick((currImageIndex + 1) % images.length)
          }
        />
      </div>
    </div>
    <div className="text-lg">
      <div className="flex flex-col justify-start">
        <p className="flex">{PRODUCT_RATING(rating)}</p>
        <p>{`${t("inStock")}: ${stock}`}</p>
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
        <p className=" text-1xl font-medium">{description}</p>
        <div className="grid justify-start mt-8 ">
          <button
            onClick={() => handleAddProduct(productData)}
            className="bg-black flex px-8 py-2 rounded mb-2 text-white font-medium items-center text-center"
          >
            <IonIcon
              icon={productAdded ? checkmark : bagHandleOutline}
              className="mr-2"
              style={{ fontSize: "1.5rem" }}
            />
            {productAdded ? `${t("home.added")}` : `${t("home.addToBag")}`}
          </button>
          <button
            onClick={
              isInWishList
                ? () => handleDisLikedProducts(id)
                : () => handleWishListedProducts(productData)
            }
            className="underline flex items-center"
          >
            <IonIcon
              icon={isInWishList ? heartDislike : add}
              className="mr-1"
              style={{ fontSize: "1.5rem" }}
            />
            {isInWishList ? `${t("home.dislike")}` : `${t("auth.wishList")}`}
          </button>
        </div>
      </div>
      <div className="flex justify-center mx-4 mt-4 items-center">
        <Link
          to={`/product-details/${id}/${title}`}
          className="underline text-lg"
        >
          {t("home.seeDetails")}
        </Link>
      </div>
    </div>
  </div>
</ProductModal>;
