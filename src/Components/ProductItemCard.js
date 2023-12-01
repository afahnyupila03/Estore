import { useState } from "react";
import ProductModal from "./ProductModal";
import { getArrivalProductService } from "../Services/HomeService/HomeService";

export default function ({ productData }) {
  const [openProductModal, setOpenProductModal] = useState(false);
  const [showModalButton, setShowModalButton] = useState(false);

  const { name, image, price, id } = productData || [];

  function handleShowProductModal() {
    setOpenProductModal(!openProductModal);
  }
  const getName = (name) => {
    const MAX_NAME_CHARS = 20;
    if (name.length > MAX_NAME_CHARS) {
      return `${name.slice(0, MAX_NAME_CHARS)}...`;
    }
    return name;
  };
  const handleViewProduct = async (productId, productName) => {
    try {
      const product = await getArrivalProductService(productId, productName);
      console.log("Product name:", productName, "Product Price", product.price);
      window.location.href = `product-details/${productId}/${productName}`;
    } catch (err) {
      console.log("Failed to view product:", err.message);
    }
  };

  return (
    <div
      onMouseEnter={() => setShowModalButton(true)}
      onMouseLeave={() => setShowModalButton(false)}
    >
      <div
        id={id}
        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
      >
        <img
          src={image}
          //   alt={product.imageAlt}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a>
              <span aria-hidden="true" className="absolute inset-0" />
              {getName(name)}
            </a>
          </h3>
          {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
        </div>
        <p className="text-sm font-medium text-gray-900">{price}</p>
      </div>

      {showModalButton && (
        <button className="mt-10 text-red-500" onClick={handleShowProductModal}>
          Quick View
        </button>
      )}
      {openProductModal && (
        <ProductModal
          image={image}
          name={name}
          price={price}
          actionButton="Close Modal"
          onCloseModal={handleShowProductModal}
          viewAction={handleViewProduct}
        />
      )}
    </div>
  );
}
