import { Fragment } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import classes from "../Components/UI/Modal.module.css"

export function Backdrop() {
  return <div className={classes.backdrop} />;
}

export const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("productModal");

export default function ({ children }) {
//   const { name, price, image } = productData || [];

  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>
          {children}
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
}
