import React, { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Store";
import { useQuery } from "react-query";
import { PurchaseServices } from "../../Services/AccountServices";
import UseAnimation from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";
import AmericanExpress from "../../Assets/Cards/american-express.png";
import MasterCard from "../../Assets/Cards/master.png";
import Discover from "../../Assets/Cards/discover.png";
import Visa from "../../Assets/Cards/visa.png";
import Mtn from "../../Assets/Cards/MTN.jpg";
import Orange from "../../Assets/Cards/orange.png";
import { useTranslation } from "react-i18next";
import { IonIcon } from "@ionic/react";
import { paperPlaneOutline } from "ionicons/icons";

const TABLE_STYLES = {
  table: {
    borderWidth: ".002rem",
    borderColor: "black",
    borderRadius: "20rem",
    marginTop: "1rem",
  },
  purchaseInfo: {
    paddingTop: "3rem",
    paddingBottom: "10px",
  },
};

export default function PurchasePage() {
  const { user } = useAuth();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const userId = user?.uid;

  const {
    data = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery(["purchaseData", userId], () => PurchaseServices(userId));

  const CURRENCY = "XAF";
  const FORMAT_MONEY = (amount, currency) => {
    const formatter = new Intl.NumberFormat("fr", {
      currency: currency,
      style: "currency",
    });
    return formatter.format(amount);
  };

  function CONVERT_CURRENCY(priceInUSD) {
    const exchangeRate = 608.58;
    const convertedPrice = Math.round(priceInUSD * exchangeRate);
    const discount = convertedPrice;
    return discount;
  }

  function DISCOUNT_PRICE(discountPercentage, price) {
    const discount = (discountPercentage / 100) * price;
    const discountedPrice = Math.round(price - discount);
    return discountedPrice;
  }

  const renderPurchaseContent = () => {
    if (user === null) {
      return (
        <div className="mt-8">
          <p className="mb-10  text-xl">{t("purchases.purchaseAuthMessage")}</p>
          <button
            className="bg-black text-center text-white py-6 px-14 rounded font-medium "
            onClick={() =>
              navigate("/sign-in-&-create-account", {
                state: { from: location },
              })
            }
          >
            {t("auth.signInCreate")}
          </button>
        </div>
      );
    } else if (isLoading) {
      return (
        <div className="flex justify-center mt-6">
          <UseAnimation animation={loading} size={80} />
        </div>
      );
    } else if (data === null && user !== null) {
      return (
        <div className="mt-4">
          <p className="mb-4">{t("purchases.0Purchases")}</p>
          <Link to="/home" className="p-2 bg-black text-white">
            {t("purchases.shopNow")}
          </Link>
        </div>
      );
    } else if (isError) {
      return (
        <div>
          <p>
            {error}
            <button type="button" onClick={() => refetch()}>
              {t("delivery.tryAgain")}
            </button>
          </p>
        </div>
      );
    } else {
      return (
        <div>
          {data.length > 3
            ? data.slice(-2).map((purchase) => {
                const {
                  id,
                  productData,
                  productQuantity,
                  tax,
                  checkoutTotal,
                  shippingPrice,
                  purchaseId,
                  email,
                  displayName,
                  address,
                  city,
                  state,
                  tel,
                  cardNumber,
                  timeOfOrder,
                  dayOfOrder,
                } = purchase;

                return (
                  // <div key={id}>
                  <table
                    key={id}
                    // style={TABLE_STYLES.table}
                    className="rounded-lg text-center w-full border-2 border-black mb-2"
                  >
                    <tr
                      style={TABLE_STYLES.purchaseInfo}
                      className="bg-gray-300 p-8 text-center"
                    >
                      <th>{t("purchases.datePlaced")}</th>
                      <th>{t("purchases.invoiceNo")}</th>
                      <th>{t("checkoutForm.taxes")}</th>
                      <th>{t("checkoutForm.shipping")}</th>
                      <th>{t("purchases.totalAmount")}</th>
                    </tr>
                    <tr>
                      <td>
                        {dayOfOrder} {timeOfOrder}
                      </td>
                      <td>{purchaseId}</td>
                      <td className="text-center">
                        {FORMAT_MONEY(parseInt(tax), CURRENCY)}
                      </td>
                      <td className="text-center">
                        {FORMAT_MONEY(parseInt(shippingPrice), CURRENCY)}
                      </td>
                      <td className="text-center">
                        {FORMAT_MONEY(parseInt(checkoutTotal), CURRENCY)}
                      </td>
                    </tr>
                    <tr className="bg-gray-300">
                      <th>{t("purchases.product")}</th>
                      <th>{t("purchases.brand")}</th>
                      <th>{t("purchases.price")}</th>
                      <th>{t("purchases.status")}</th>
                      <th>{t("purchases.info")}</th>
                    </tr>
                    {productData.map((item) =>
                      Object.keys(item).map((key) => (
                        <tr key={key}>
                          <td>
                            {getName(item[key].title)} x {item[key].quantity}
                          </td>
                          <td className="text-center">{item[key].brand}</td>
                          <td className="text-center">
                            {FORMAT_MONEY(item[key].price, CURRENCY)}
                          </td>
                          <td className="text-center">
                            {t("purchases.transit")}
                            <IonIcon
                              icon={paperPlaneOutline}
                              className="ml-2"
                            />
                          </td>
                          <td className="text-center">{t("purchases.view")}</td>
                        </tr>
                      ))
                    )}
                    <tr className="bg-gray-300 text-center">
                      <th>{t("purchases.userInfo")}</th>
                      <th>{t("purchases.deliveryInfo")}</th>
                      <th>{t("purchases.paymentInfo")}</th>
                      <th>{t("purchases.prodQuant")}</th>
                      <th>{t("purchases.invoice")}</th>
                    </tr>
                    <tr>
                      <td>{email}</td>
                      <td>
                        {city}, {state}
                      </td>
                      <td>
                        {t("endsWith")} ({HIDE_CARD_NUMBER(cardNumber)})
                      </td>
                      <td className="text-center">{productQuantity}</td>

                      <td className="text-center">
                        {t("purchases.viewInvoice")}
                      </td>
                    </tr>
                    <tr>
                      <td>{displayName}</td>
                      <td>{address}</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>{tel}</td>
                    </tr>
                  </table>
                  // </div>
                );
              })
            : data.map((purchase) => {
                const {
                  id,
                  productData,
                  productQuantity,
                  tax,
                  checkoutTotal,
                  shippingPrice,
                  purchaseId,
                  email,
                  displayName,
                  address,
                  city,
                  state,
                  tel,
                  cardNumber,
                  timeOfOrder,
                  dayOfOrder,
                } = purchase;

                return (
                  <div className="border-1 border-black rounded-lg" key={id}>
                    <table
                      key={id}
                      className="rounded-lg w-full border-2 border-black mb-2"
                    >
                      <tr
                        style={TABLE_STYLES.purchaseInfo}
                        className="bg-gray-300 p-8 text-center"
                      >
                        <th>{t("purchases.datePlaced")}</th>
                        <th>{t("purchases.invoiceNo")}</th>
                        <th>{t("checkoutForm.taxes")}</th>
                        <th>{t("checkoutForm.shipping")}</th>
                        <th>{t("purchases.totalAmount")}</th>
                      </tr>
                      <tr>
                        <td>
                          {dayOfOrder} {timeOfOrder}
                        </td>
                        <td>{purchaseId}</td>
                        <td className="text-center">
                          {FORMAT_MONEY(parseInt(tax), CURRENCY)}
                        </td>
                        <td className="text-center">
                          {FORMAT_MONEY(parseInt(shippingPrice), CURRENCY)}
                        </td>
                        <td className="text-center">
                          {FORMAT_MONEY(parseInt(checkoutTotal), CURRENCY)}
                        </td>
                      </tr>
                      <tr className="bg-gray-300">
                        <th>{t("purchases.product")}</th>
                        <th>{t("purchases.brand")}</th>
                        <th>{t("purchases.price")}</th>
                        <th>{t("purchases.status")}</th>
                        <th>{t("purchases.info")}</th>
                      </tr>
                      {productData.map((item) =>
                        Object.keys(item).map((key) => (
                          <tr key={key}>
                            <td>
                              {getName(item[key].title)} x {item[key].quantity}
                            </td>
                            <td className="text-center">{item[key].brand}</td>
                            <td className="text-center">
                              {FORMAT_MONEY(
                                DISCOUNT_PRICE(
                                  item[key].discountPercentage,
                                  CONVERT_CURRENCY(item[key].price)
                                ),
                                CURRENCY
                              )}
                            </td>
                            <td className="text-center">
                              {t("purchases.transit")}
                              <IonIcon
                                icon={paperPlaneOutline}
                                className="ml-2"
                              />
                            </td>
                            <td className="text-center text-gray-800">
                              {t("purchases.view")}
                            </td>
                          </tr>
                        ))
                      )}
                      <tr className="bg-gray-300 text-center">
                        <th>{t("purchases.userInfo")}</th>
                        <th>{t("purchases.deliveryInfo")}</th>
                        <th>{t("purchases.paymentInfo")}</th>
                        <th>{t("purchases.prodQuant")}</th>
                        <th>{t("purchases.invoice")}</th>
                      </tr>
                      <tr>
                        <td>{email}</td>
                        <td>
                          {city}, {state}
                        </td>
                        <td>
                          {t("endsWith")} ({HIDE_CARD_NUMBER(cardNumber)})
                        </td>
                        <td className="text-center">{productQuantity}</td>
                        <td className="text-center">
                          <Link
                            target="_blank"
                            className="text-gray-800"
                            to={`/purchases/${id}/${purchaseId}`}
                          >
                            {t("purchases.viewInvoice")}
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>{displayName}</td>
                        <td>{address}</td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>{tel}</td>
                      </tr>
                    </table>
                  </div>
                );
              })}
        </div>
      );
    }
  };

  return (
    <Fragment>
      <div>
        <h1 className="text-2xl font-medium ">
          {t("auth.purchases")} <span>({data.length})</span>
        </h1>
      </div>
      <div className="mt-2">{renderPurchaseContent()}</div>
    </Fragment>
  );
}

const visaRegex = /^(?<VISA>4\d{3}[\s-]?(?:\d{4}[\s-]?){2}\d(?:\d{3})?)$/;
const mastercardRegex =
  /^(?<MASTERCARD>5[1-5]\d{2}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4})$/;
const amexRegex = /^(?<AMEX>3[47]\d{13,14})$/;
const discoverRegex = /^(?<DISCOVER>6(?:011|22(?:[2-8]|9\d))\d{12})$/;
const orangeCameroonRegex = /^(6[5-7]\d{7})$/;
const mtnCameroonRegex = /^(6[8-9]\d{7})$/;

const getCardType = (cardNumber) => {
  if (visaRegex.test(cardNumber)) {
    return "visa";
  } else if (mastercardRegex.test(cardNumber)) {
    return "mastercard";
  } else if (amexRegex.test(cardNumber)) {
    return "amex";
  } else if (discoverRegex.test(cardNumber)) {
    return "discover";
  } else if (orangeCameroonRegex.test(cardNumber)) {
    return "orange";
  } else if (mtnCameroonRegex.test(cardNumber)) {
    return "mtn";
  } else {
    return "Invalid number";
  }
};

function HIDE_CARD_NUMBER(cardNumber) {
  if (visaRegex.test(cardNumber)) {
    return cardNumber.substring(12);
  } else if (mastercardRegex.test(cardNumber)) {
    return cardNumber.substring(12);
  } else if (amexRegex.test(cardNumber)) {
    return cardNumber.substring(11);
  } else if (discoverRegex.test(cardNumber)) {
    return cardNumber.substring(12);
  } else if (
    orangeCameroonRegex.test(cardNumber) ||
    mtnCameroonRegex.test(cardNumber)
  ) {
    return cardNumber.substring(5);
  }
}

const getNumberType = (cardNumber) => {
  if (visaRegex.test(cardNumber)) {
    return Visa;
  } else if (mastercardRegex.test(cardNumber)) {
    return MasterCard;
  } else if (amexRegex.test(cardNumber)) {
    return AmericanExpress;
  } else if (discoverRegex.test(cardNumber)) {
    return Discover;
  } else if (orangeCameroonRegex.test(cardNumber)) {
    return Orange;
  } else if (mtnCameroonRegex.test(cardNumber)) {
    return Mtn;
  }
};

const getName = (title) => {
  const MAX_TITLE_CHARS = 20;
  if (title.length > MAX_TITLE_CHARS) {
    return `${title.slice(0, MAX_TITLE_CHARS)}...`;
  }
  return title;
};
