// TODO:fix to implement productModal design.
// TODO: ADD SINGLE PRODUCT NAVIGATION TO THE VIEW LINK.

import { Fragment } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import classes from "../Components/UI/Modal.module.css";
import { IonIcon } from "@ionic/react";
import { bagHandleOutline, eyeOutline, heartOutline } from "ionicons/icons";

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

export default function ({
  name,
  price,
  image,
  description,
  actionButton,
  onCloseModal,
  viewAction,
}) {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>
          <div className="flex">
            <div>
              <img
                src={image}
                alt="product-image"
                className="object-cover h-48 w-96"
              />
            </div>
            {/* Product Information */}
            <div>
              <div>
                <p className="mb-8">{name}</p>
              </div>
              <div>
                <p>{price}</p>
                <p>{description}</p>
                <div className="flex gap-3">
                  <button className="b-2 bg-red-500 p-2 text-white rounded">
                    <IonIcon icon={bagHandleOutline} className="mr-2" />
                    Add to Bag
                  </button>
                  <button className="b-2 bg-red-500 p-2 text-white rounded">
                    <IonIcon icon={heartOutline} className="mr-2" />
                    Add to Wish List
                  </button>
                </div>
              </div>
              <div className="flex flex-row-reverse mx-4">
                <button onClick={onCloseModal}>{actionButton}</button>
                <Link
                  onClick={viewAction}
                  className="b-2 bg-red-500 p-2 rounded text-white"
                >
                  <IonIcon icon={eyeOutline} className="mr-2" />
                  View
                </Link>
              </div>
            </div>
          </div>
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
}
