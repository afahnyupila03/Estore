import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "../styles/Payment.module.css"

const backdropColor = {
  backgroundColor: "hsla(0, 0%, 0%, 0.749)",
};

export function Backdrop() {
  return (
    <div
      style={backdropColor}
      className="backdrop-blur-sm fixed top-0 left-0 z-10 w-full h-full"
    />
  );
}

export function ModalOverlay({ children }) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
}

const portalElement = document.getElementById("paymentMethod");
export default function PaymentModalModal({ children }) {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
}
