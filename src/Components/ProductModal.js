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
          <div className="flex items-center gap-8 p-6">
            <div>
              <img src={image} alt={name} className="object-fill" />
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
                  <button
                    className="border-red-500 mr-4 rounded hover:bg-red-500 hover:text-white 
                  transition:ease-out duration-1000
                  border-2 flex items-center text-red-500"
                  >
                    <IonIcon icon={bagHandleOutline} className="mr-2" />
                    Buy
                  </button>
                  <button
                    className="border-red-500 mr-4 rounded hover:bg-red-500 hover:text-white 
                  transition:ease-out duration-1000
                  border-2 flex items-center text-red-500"
                  >
                    <IonIcon icon={heartOutline} className="mr-2" />
                    Wish List
                  </button>
                </div>
              </div>
              <div className="flex flex-row-reverse mx-4 items-center ">
                <button onClick={onCloseModal}>{actionButton}</button>
                <Link
                  onClick={viewAction}
                  className="border-red-500 mr-4 rounded hover:bg-red-500 hover:text-white 
                  transition:ease-out duration-1000
                  border-2 flex items-center text-red-500"
                >
                  <IonIcon
                    icon={eyeOutline}
                    style={{ color: "red" }}
                    className="mr-2"
                  />
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
