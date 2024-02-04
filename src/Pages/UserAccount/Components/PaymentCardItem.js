import React from "react";

export default function PaymentCardItem({ paymentDetails }) {
  const {
    id,
    firstName,
    lastName,
    cardNumber,
    expiryDate,
    securityCode,
    editHandler,
    deleteHandler,
  } = paymentDetails || [];
  return (
    <div className="border-black border-2 rounded mt-10 p-4" loading="lazy" key={id}>
      <div>
        <p>
          {firstName} {lastName}
        </p>
      </div>
      <div className="mt-2">
        <p>Card Number: {cardNumber}</p>
        <p>Expiry date: {expiryDate}</p>
        <p>SecurityCode: {securityCode}</p>
      </div>
      <div className="mt-6">
        <button
          onClick={editHandler}
          className="border-black border-b-2 text-center"
        >
          Edit
        </button>
        <br />
        <button
          onClick={deleteHandler}
          className="border-black border-b-2 text-center"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
