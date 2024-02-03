import React from "react";

export default function DeliveryCardItem({deliveryDetails}) {
  const { editHandler, removeHandler, firstName, lastName, address, city, zip, state, apt } =
    deliveryDetails || {};

  return (
    <div className="p-4 border-2 border-black rounded">
      <div className="mb-8">
        <p>
          {firstName} {lastName}
        </p>
        <p>{address}</p>
        <p>{city}</p>
        <p>{apt} {zip}</p>
        <p>{state}</p>
      </div>
      <button
        className="border-black border-b-2"
        type="button"
        onClick={editHandler}
      >
        Edit
      </button>
      <br />
      <button
        className="border-black border-b-2"
        type="button"
        onClick={removeHandler}
      >
        Remove
      </button>
    </div>
  );
}
