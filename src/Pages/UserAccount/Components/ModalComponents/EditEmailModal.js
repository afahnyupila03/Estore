import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./styles/EditEmail.module.css";

const backdropColor = {
  backgroundColor: "hsla(0, 0%, 0%, 0.749)",
};

export function EmailBackdrop() {
  return (
    <div
      style={backdropColor}
      className="backdrop-blur-sm fixed top-0 left-0 z-30 w-full h-full"
    />
  );
}

export function EmailOVerlay({ children }) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
}

const portalElement = document.getElementById("editEmail");

export default function EmailModal({ children }) {
  return (
    <Fragment>
      {ReactDOM.createPortal(<EmailBackdrop />, portalElement)}
      {ReactDOM.createPortal(
        <EmailOVerlay>{children}</EmailOVerlay>,
        portalElement
      )}
    </Fragment>
  );
}
