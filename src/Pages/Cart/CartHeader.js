import { Fragment } from "react";
import { useTranslation } from "react-i18next";

export default function ({ itemsCounter, amount }) {
  const { t } = useTranslation();

  return (
    <Fragment>
      <div>
        <h3>
          {t("cart.items")}: {itemsCounter}
        </h3>
        <p>
          {t("cart.amount")}: {amount} XAF
        </p>
      </div>
    </Fragment>
  );
}
