import { useTranslation } from "react-i18next";
import React from "react";

export default function DeliveryCardItem({
  deliveryDetails,
  deleteHandler,
  editHandler,
}) {
  const { t } = useTranslation();

  const { id, firstName, lastName, address, city, zip, state, apt } =
    deliveryDetails || {};

  return (
    <div loading="lazy" className="font-mono p-4 border-2 border-black rounded">
      <div className="mb-4">
        <p>{id}</p>
        <p>
          {firstName} {lastName}
        </p>
        <p className="mb-2">{address}</p>
        <p>
          {state} {city}
        </p>
        <p>
          {apt} {zip}
        </p>
      </div>

      <div>
        <button
          className="border-black border-b-2"
          type="button"
          onClick={editHandler}
        >
          {t("delivery.edit")}
        </button>
      </div>
      <div>
        <button
          className="border-black p-x-10 border-b-2"
          // type="button"
          onClick={deleteHandler}
        >
          {t("delivery.remove")}
        </button>
      </div>
    </div>
  );
}
