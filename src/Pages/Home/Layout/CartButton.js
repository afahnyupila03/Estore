import React from "react";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { bagHandleOutline } from "ionicons/icons";

const styles = {
  /* CartIcon.css */
  cartIconWrapper: {
    position: "relative",
    display: "inline-block",
  },

  cartCounter: {
    position: "absolute",
    top: "-8px",
    right: "-10px",
    color: "white",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "12px",
    fontWeight: "bold",
  },
};

export default function CartIcon({ cartCount }) {
  return (
    <div style={styles.cartIconWrapper}>
      <Link className="ml-6 cart-link" to="/cart">
        <IonIcon icon={bagHandleOutline} size="large" />
      </Link>
      {cartCount > 0 && (
        <div className="bg-gray-900" style={styles.cartCounter}>
          {cartCount}
        </div>
      )}
    </div>
  );
}
