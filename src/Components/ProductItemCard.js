import { useState } from "react";
import ProductModal from "./ProductModal";

export default function (props) {
  const [openProductModal, setOpenProductModal] = useState(false);
  const [showModalButton, setShowModalButton] = useState(false);

  const { title, image, price, id, category, description } =
    props.productData || [];

  function handleShowProductModal() {
    setOpenProductModal(!openProductModal);
  }
  const getName = (title) => {
    const MAX_NAME_CHARS = 20;
    if (title.length > MAX_NAME_CHARS) {
      return `${title.slice(0, MAX_NAME_CHARS)}...`;
    }
    return title;
  };

  const productPrice = `$${price}`;

  return (
    <div
      loading="lazy"
      onMouseEnter={() => setShowModalButton(true)}
      onMouseLeave={() => setShowModalButton(false)}
    >
      <div
        id={id}
        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <span aria-hidden="true">{getName(title)}</span>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{category}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{productPrice}</p>
        </div>
      </div>

      {showModalButton && (
        <button className="mt-10 text-red-500" onClick={handleShowProductModal}>
          Quick View
        </button>
      )}
      {openProductModal && (
        <ProductModal
          image={image}
          name={title}
          price={price}
          description={description}
          actionButton="Close Modal"
          onCloseModal={handleShowProductModal}
        />
      )}
    </div>
  );
}
