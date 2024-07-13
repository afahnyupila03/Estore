import { useTranslation } from "react-i18next";
import React from "react";

const TRIM_MOBILE_NUMBER = (mobileNumber) => {
  if (mobileNumber.length === 9) {
    const number = formatCameroonPhoneNumber(mobileNumber);
    const hiddenDigits =
      number.substring(0, 4) +
      " " +
      "*".repeat(8) +
      " " +
      number.substring(13, 16);
    return hiddenDigits;
  }
};

function TRIM_BANKCARD_NUMBER(cardNumber) {
  if (cardNumber.length === 16) {
    const bankNumber = formatBankCardNumber(cardNumber);
    const hiddenDigits =
      bankNumber.substring(0, 4) +
      " " +
      "*".repeat(11) +
      " " +
      cardNumber.substring(12, 18);
    return hiddenDigits;
  } else if (cardNumber.length === 0) {
    return "No card number";
  }
}

const formatBankCardNumber = (cardNumber) => {
  if (!cardNumber) return ""; // Check if cardNumber is undefined or null

  // Remove any non-digit characters
  const digits = cardNumber.toString().replace(/\D/g, "");

  // Determine card type based on the starting digits
  let formattedCardNumber;

  if (/^3[47]\d{13}$/.test(digits)) {
    // American Express: starts with 34 or 37, 15 digits
    formattedCardNumber = digits.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3");
  } else if (/^4\d{15}$/.test(digits)) {
    // Visa: starts with 4, 16 digits
    formattedCardNumber = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  } else if (/^5[1-5]\d{14}$/.test(digits)) {
    // MasterCard: starts with 51-55, 16 digits
    formattedCardNumber = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  } else if (/^6(?:011|5\d{2})\d{12}$/.test(digits)) {
    // Discover: starts with 6011 or 65, 16 digits
    formattedCardNumber = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  } else {
    // Default: format as Visa/MasterCard/Discover
    formattedCardNumber = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  return formattedCardNumber;
};

function formatCameroonPhoneNumber(phoneNumber) {
  const digits = phoneNumber.toString().replace(/\D/g, "");
  if (digits.startsWith("237")) {
    return `+237 ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(
      9,
      12
    )}`;
  }
  return `+237 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(
    6,
    9
  )}`;
}

function TRIM_SECURITY_CODE(code) {
  if (code.length === 3) return "*".repeat(3);
}

export default function PaymentCardItem({
  paymentDetails,
  editHandler,
  deleteHandler,
}) {
  const { t } = useTranslation();

  const {
    id,
    firstName,
    lastName,
    cardNumber,
    expiryDate,
    securityCode,
    accountNumber,
    accountName,
  } = paymentDetails || [];
  return (
    <div
      className="border-black border-2 rounded p-4 text-lg font-medium"
      loading="lazy"
    >
      <div className="mb-4">
        <p>
          {accountName
            ? `${t("personalInfor.name")}: ${accountName}`
            : `${t("personalInfor.name")} : ${firstName} ${lastName}`}
        </p>
      </div>
      <div className="mb-4">
        <p>
          {accountNumber
            ? `${t("checkoutForm.cardNumber")}: ${TRIM_MOBILE_NUMBER(
                accountNumber
              )}`
            : `${t("checkoutForm.cardNumber")}: ${TRIM_BANKCARD_NUMBER(
                cardNumber
              )} `}
        </p>
        {!accountName && !accountNumber && (
          <>
            <p>
              {t("checkoutForm.expiryDate")}: {expiryDate}
            </p>
            <p>
              {t("personalInfor.securityCode")}:{" "}
              {TRIM_SECURITY_CODE(securityCode)}
            </p>
          </>
        )}
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
