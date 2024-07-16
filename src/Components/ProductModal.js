"use client";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import { IonIcon } from "@ionic/react";

import classes from "./ProductModal.module.css";
import { Modal } from "flowbite-react";

const backdropColor = {
  backgroundColor: "hsla(0, 0%, 0%, 0.749)",
};

export function Backdrop() {
  return (
    <div
      style={backdropColor}
      className="backdrop-blur-sm fixed top-0 left-0 z-20 w-full h-full"
    />
  );
}

export const ModalOverlay = ({ children, icon, style, actionHandler }) => {
  return (
    <div className={classes.modal}>
      <div className="flex justify-end">
        <IonIcon icon={icon} style={style} onClick={actionHandler} />
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("productModal");

export default function ProductModal({ children, icon, style, actionHandler }) {
  if (!portalElement) {
    console.error("Target element 'productModal' not found in the DOM");
    return null;
  }

  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay icon={icon} style={style} actionHandler={actionHandler}>
          {children}
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
}

export function ModalComponent({
  isOpen,
  onClose,
  modalHeader,
  modalBody,
  modalFooter,
  size,
  position,
  className
}) {
  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      className={className}
      size={size}
      position={position}
    >
      <Modal.Header>{modalHeader}</Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>{modalFooter}</Modal.Footer>
    </Modal>
  );
}
