import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "../styles/passwordModal.module.css";

const backdropColor = {
  backgroundColor: "hsla(0, 0%, 0%, 0.749)",
};

export function PasswordBackdrop() {
  return (
    <div
    style={backdropColor}
    className="backdrop-blur-sm  fixed top-0 left-0 z-20 w-full h-full"
  />
  );
}

export function PasswordOverlay({ children }) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
}

const portalElement = document.getElementById("editPassword");

export default function PasswordModal({ children }) {
  return (
    <Fragment>
      {ReactDOM.createPortal(<PasswordBackdrop />, portalElement)}
      {ReactDOM.createPortal(
        <PasswordOverlay>{children}</PasswordOverlay>,
        portalElement
      )}
    </Fragment>
  );
}
