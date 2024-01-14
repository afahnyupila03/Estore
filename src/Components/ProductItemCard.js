import { useState } from "react";
import ProductModal from "./ProductModal";
import { IonIcon } from "@ionic/react";
import { starOutline } from "ionicons/icons";

export default function (props) {
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

  const productPrice = `$${price}`;

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
      <div className="mt-4 flex justify-between">
        <div>
          <h4 className="text-sm font-mono text-gray-700">
            <span aria-hidden="true">{getName(title)}</span>
          </h4>
          <p className="flex justify-start">{brand}</p>

          <p className="mt-1 flex justify-start text-sm font-mono text-gray-500">
            {category}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium font-mono text-gray-900">
            {productPrice}
          </p>
          <p>{discountPercentage}%</p>
          <div className="flex items-center">
            <IonIcon icon={starOutline} className="mr-2" /> {rating}
            <span>({stock})</span>
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
