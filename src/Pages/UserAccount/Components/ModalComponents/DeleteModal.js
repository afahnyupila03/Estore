import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "../styles/deleteModal.module.css";

const backdropColor = {
  backgroundColor: "hsla(0, 0%, 0%, 0.749)",
};

export function DeleteBackdrop() {
  return (
    <div
      style={backdropColor}
      className="backdrop-blur-sm fixed top-0 left-0 z-30 w-full h-full"
    />
  );
}

export function DeleteOverlay({ children }) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
}

const portalElement = document.getElementById("delete");

export default function DeleteModal({ children }) {
  return (
    <Fragment>
      {ReactDOM.createPortal(<DeleteBackdrop />, portalElement)}
      {ReactDOM.createPortal(
        <DeleteOverlay>{children}</DeleteOverlay>,
        portalElement
      )}
    </Fragment>
  );
}
