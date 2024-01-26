import React, { useState } from "react";
import DeliveryModal from "./Components/Modal";

export default function DeliveryPage() {
  const [modal, setModal] = useState(false);

  const modalHandler = () => {
    setModal(!modal)
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold font-mono">Delivery Addresses</h1>
      <button
        onClick={modalHandler}
        className="p-2 border-2 border-black"
      >
        Add New Address
      </button>
      <p>
        Checkout faster by adding one or more shipping addresses to your
        account.
      </p>

      {modal && (
        <DeliveryModal>
          <h1>Fill Delivery Information</h1>
          <h1>Fill Delivery Information</h1>
          <h1>Fill Delivery Information</h1>
          <h1>Fill Delivery Information</h1>
          <h1>Fill Delivery Information</h1>
          <h1>Fill Delivery Information</h1>
          <h1>Fill Delivery Information</h1>
          <h1>Fill Delivery Information</h1>
        </DeliveryModal>
      )}
    </div>
  );
}
