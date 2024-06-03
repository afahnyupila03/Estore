import { useTranslation } from "react-i18next";
import React from "react";

export default function PaymentCardItem({
  paymentDetails,
  editHandler,
  deleteHandler,
}) {
  const { t } = useTranslation();

  const { id, firstName, lastName, cardNumber, expiryDate, securityCode } =
    paymentDetails || [];
  return (
    <div
      className="border-black border-2 rounded p-4 font-mono"
      loading="lazy"
    >
      <div className="mb-4">
        <p>{id}</p>
        <p>
          {firstName} {lastName}
        </p>
      </div>
      <div className="mb-4">
        <p>
          {t("checkoutForm.cardNumber")}: {HIDE_CARD_NUMBER(cardNumber)}
        </p>
        <p>
          {t("personalInfor.securityCode")}: {HIDE_SECURITY_CODE(securityCode)}
        </p>
        <p>
          {t("checkoutForm.expiryDate")}: {expiryDate}
        </p>
      </div>
      <div>
        <div>
          <button
            type="button"
            onClick={editHandler}
            className="border-black border-b-2 text-center"
          >
            {t("delivery.edit")}
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={deleteHandler}
            className="border-black border-b-2 text-center"
          >
            {t("delivery.remove")}
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
  }
}

function HIDE_SECURITY_CODE(code) {
  if (code.length === 3) {
    const hiddenCode = "*".repeat(3);
    return hiddenCode;
  }
}
