import React, { useRef, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Store";
import { PurchaseService } from "../../Services/AccountServices";
import { database } from "../../FirebaseConfigs/Firesbase";
import { doc } from "firebase/firestore";
import html2canvas from "html2canvas";
import UseAnimation from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";
import Icon from "../../Components/Icon";
import { reloadOutline } from "ionicons/icons";
import jsPDF from "jspdf";
import { useTranslation } from "react-i18next";

export default function SinglePurchasePage() {
  const { user } = useAuth();

  const { t } = useTranslation();

  const [contentReady, setContentReady] = useState(false);
  const captureRef = useRef(null);
  const [hideButton, setHideButton] = useState(false);

  const { id, purchaseId } = useParams();
  const serviceId = doc(database, user?.uid + "/purchase/" + "products/" + id);
  const { data, isLoading, refetch, isError, error } = useQuery(
    ["purchaseData", user?.uid],
    () => PurchaseService(user?.uid, serviceId.id)
  );
  const {
    address,
    productQuantity,
    shippingPrice,
    state,
    tax,
    timeOfOrder,
    dayOfOrder,
    displayName,
    email,
    productData,
    checkoutTotal,
    city,
  } = data || [];

  useEffect(() => {
    if (productData) {
      setContentReady(true);
    }
  }, [productData]);

  const handleCaptureInvoice = () => {
    setTimeout(() => {
      setHideButton(true);
    }, 500);
    if (contentReady) {
      setTimeout(() => {
        const captureRef = document.querySelector(".border-2"); // Replace with the appropriate selector for the target div
        html2canvas(captureRef).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");

          const pdf = new jsPDF("p", "mm", "a4");
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let position = 0;

          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

          pdf.save(`${purchaseId}.pdf`);

          setHideButton(false);
        });
      }, 1000);
    }
  };

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

  const INVOICE_DATA = () => {
    if (isLoading) {
      return (
        <div className="flex m-40 justify-center">
          <UseAnimation animation={loading} size={88} />
        </div>
      );
    } else if (isError) {
      return (
        <div className="flex justify-center">
          <Icon
            icon={reloadOutline}
            style={{ fontSize: "7rem" }}
            actionButton={() => refetch()}
          />
        </div>
      );
    } else {
      return (
        <div className="border-2 border-black rounded-md p-8" ref={captureRef}>
          <div className="flex mb-2 justify-between items-center">
            <div className="flex justify-center">
              <h1 className="text-center mb-2 text-black text-6xl font-bold tracking-widest">
                TZ
              </h1>
            </div>
            <div className="font-medium text-black text-lg">
              <h1>TimeZone,</h1>
              <p>Saint clair, Molyko,</p>
              <p>Buea, Southwest,</p>
              <p>{t("home.cameroon")}</p>
            </div>
          </div>
          <div className="flex mb-2 justify-between font-medium">
            <div className="text-black">
              <h3>{t("purchases.billTo")}</h3>
              <p>{email}</p>
              <p>{displayName}</p>
            </div>
            <div className="text-black">
              <h3 className="text-black">{t("purchases.invoice:")}</h3>
              <p>{purchaseId}</p>
            </div>
          </div>
          <div className="text-black mb-2 font-medium">
            <h3>{t("purchases.shipTo")}</h3>
            <p>{address}</p>
            <p>
              {city}, {state}
            </p>
          </div>
          <div className="font-medium text-black mb-4">
            <p>
              {t("purchases.invoiceDate")} {`${dayOfOrder} ${timeOfOrder}`}
            </p>
          </div>
          <table className=" text-black font-medium w-full">
            <tr className="text-center gap-x-4 mb-2 px-4">
              <th>{t("purchases.sn")}</th>
              <th>{t("purchases.items")}</th>
              <th>{t("purchases.qty")}</th>
              <th>{t("purchases.price")}</th>
              <th>{t("purchases.amount")}</th>
            </tr>
            {productData.map((invoice, index) =>
              Object.keys(invoice).map((key, subIndex) => (
                <tr key={invoice[key].id}>
                  <td>{index * Object.keys(invoice).length + subIndex + 1}</td>
                  <td>{getName(invoice[key].title)}</td>
                  <td>{invoice[key].quantity}</td>
                  <td>
                    {FORMAT_MONEY(
                      DISCOUNT_PRICE(
                        invoice[key].discountPercentage,
                        CONVERT_CURRENCY(invoice[key].price)
                      ),
                      CURRENCY
                    )}
                  </td>
                  <td>
                    {FORMAT_MONEY(
                      `${
                        DISCOUNT_PRICE(
                          invoice[key].discountPercentage,
                          CONVERT_CURRENCY(invoice[key].price)
                        ) * invoice[key].quantity
                      }`,
                      CURRENCY
                    )}
                  </td>
                </tr>
              ))
            )}
          </table>
          <div className="mt-4 flex justify-between text-black font-medium">
            <div>
              <p>
                {t("purchases.thankYou")}
                <br />
                {t("at")} TimeZone
              </p>
            </div>
            <div className="border-2 border-black p-2 rounded-md">
              <p>
                {t("checkoutForm.shipping")}:
                {FORMAT_MONEY(parseInt(shippingPrice), CURRENCY)}
              </p>
              <p>
                {t("checkoutForm.taxes")}:{" "}
                {FORMAT_MONEY(parseInt(tax), CURRENCY)}
              </p>
              <p>
                {t("checkoutForm.total")}:{" "}
                {FORMAT_MONEY(parseInt(checkoutTotal), CURRENCY)}
              </p>
            </div>
          </div>
          <button
            className={`${hideButton && "hidden"} bg-gray-800 
            text-white font-medium mt-4
            px-4 rounded-md tracking-wider
            `}
            type="button"
            onClick={handleCaptureInvoice}
          >
            {t("purchases.downloadInvoice")}
          </button>
        </div>
      );
    }
  };

  return <div className="flex justify-center mt-8">{INVOICE_DATA()}</div>;
}

const getName = (title) => {
  const MAX_TITLE_CHARS = 20;
  if (title.length > MAX_TITLE_CHARS) {
    return `${title.slice(0, MAX_TITLE_CHARS)}...`;
  }
  return title;
};
