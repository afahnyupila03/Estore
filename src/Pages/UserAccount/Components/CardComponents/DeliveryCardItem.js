import React from "react";

export default function DeliveryCardItem({
  deliveryDetails,
  deleteHandler,
  editHandler,
}) {
  const { firstName, lastName, address, city, zip, state, apt } =
    deliveryDetails || {};

  return (
    <div loading="lazy" className="font-mono p-4 border-2 border-black rounded">
      <div className="mb-4">
        <p>
          {firstName} {lastName}
        </p>
        <p className="mb-2">{address}</p>
        <p>{city}</p>
        <p>
          {apt} {zip}
        </p>
        <p>{state}</p>
      </div>

      <div>
        <button
          className="border-black border-b-2"
          type="button"
          onClick={editHandler}
        >
          Edit
        </button>
      </div>
      <div>
        <button
          className="border-black p-x-10 border-b-2"
          // type="button"
          onClick={deleteHandler}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
