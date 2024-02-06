import ReactDOM from "react-dom";
import React, { Fragment } from "react";
import classes from "../styles/nameModal.module.css";

const backdropColor = {
  backgroundColor: "hsla(0, 0%, 0%, 0.749)",
};

export function NameBackdrop() {
  return (
    <div
      style={backdropColor}
      className="backdrop-blur-sm  fixed top-0 left-0 z-20 w-full h-full"
    />
  );
}

export function NameOverlay({ children }) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
}

const PortalElement = document.getElementById("editName");

export default function NameModal({ children }) {
  return (
    <Fragment>
      {ReactDOM.createPortal(<NameBackdrop />, PortalElement)}
      {ReactDOM.createPortal(
        <NameOverlay>{children}</NameOverlay>,
        PortalElement
      )}
    </Fragment>
  );
}
