import { Fragment, useState } from "react";

export default function ProductItemCard() {
  const [onHover, setOnHover] = useState(false);

  return (
    <Fragment> 
      <div className="flex my-6 py-6" onMouseOut={() => setOnHover(false)} onMouseOver={() => setOnHover(true)}>
        <div>{/* Image div */}</div>
        <div>
          <p>New or Not</p>
          <p>Brand</p>
          <p>Product Name</p>
          <p>Product Price</p>
          <p>Product Ratings</p>
          {onHover && <button>View Product</button>}
        </div>
      </div>
    </Fragment>
  );
}
