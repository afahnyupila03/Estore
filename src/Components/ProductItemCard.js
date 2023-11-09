import { useState } from "react";
import ProductModal from "./ProductModal";

export default function ({ productData }) {
  const [openProductModal, setOpenProductModal] = useState(false);

  const { name, image, price } = productData || [];

  const handleShowProductModal = () => {
    setOpenProductModal(
      prevState => !prevState
    )
  }

  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
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
              {name}
            </a>
          </h3>
          {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
        </div>
        <p className="text-sm font-medium text-gray-900">{price}</p>
      </div>

      <button className="mt-4 text-red-500" onClick={handleShowProductModal}>View Product</button>
      {!openProductModal && (
        <ProductModal>
          <button onClick={handleShowProductModal}>Close</button>
        </ProductModal>
      )}
    </div>
  );
}
