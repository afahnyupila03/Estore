import React from "react";

export default function PaymentCardItem({
  paymentDetails,
  editHandler,
  deleteHandler,
}) {
  const { id, firstName, lastName, cardNumber, expiryDate, securityCode } =
    paymentDetails || [];
  return (
    <div
      className="border-black border-2 rounded p-4 font-mono"
      loading="lazy"
      key={id}
    >
      <div className="mb-4">
        <p>Unique id: {id}</p>
        <p>
          {firstName} {lastName}
        </p>
      </div>
      <div className="mb-4">
        <p>Card Number: {HIDE_CARD_NUMBER(cardNumber)}</p>
        <p>SecurityCode: {HIDE_SECURITY_CODE(securityCode)}</p>
        <p>Expiry date: {expiryDate}</p>
      </div>
      <div>
        <div>
          <button
            onClick={editHandler}
            className="border-black border-b-2 text-center"
          >
            {t("delivery.edit")}
          </button>
        </div>
        <div>
          <button
            onClick={deleteHandler}
            className="border-black border-b-2 text-center"
          >
            {t("delivery.edit")}
          </button>
        </div>
      </div>
    </div>
  );
}

function HIDE_CARD_NUMBER(bankNumber) {
  if (bankNumber.length === 16) {
    const hiddenDigits =
      bankNumber.substring(0, 3) +
      "*".repeat(10) +
      bankNumber.substring(13, 16);
    return hiddenDigits;
  } else {
    return "Invalid bank number";
  }
}

function HIDE_SECURITY_CODE(code) {
  if (code.length === 3) {
    const hiddenCode = "*".repeat(3);
    return hiddenCode;
  }
}
