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
  id,
  price,
  image,
  description,
  actionButton,
  onCloseModal,
}) {
  const productPrice = `$${price}`;

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
                <p className="font-mono">{name}</p>
                <p className="font-mono">{productPrice}</p>
              </div>
              <div className="mt-4">
                <p className="font-mono">{description}</p>
                <div className="flex gap-3 mt-4">
                  <button
                    className="border-red-500 p-1 mr-4 font-semibold
                    rounded hover:bg-red-500 hover:text-white 
                  transition:ease-out duration-1000
                  border-2 flex items-center text-red-500"
                  >
                    <IonIcon icon={bagHandleOutline} className="mr-2" style={{fontSize: '1.5rem'}} />
                    Buy
                  </button>
                  <button
                    className="border-red-500 p-1 mr-4 font-semibold
                    rounded hover:bg-red-500 hover:text-white 
                  transition:ease-out duration-1000
                  border-2 flex items-center text-red-500"
                  >
                    <IonIcon icon={heartOutline} className="mr-2" style={{fontSize: '1.5rem'}} />
                    Wish List
                  </button>
                </div>
              </div>
              <div className="flex flex-row-reverse mx-4 mt-4 items-center ">
                <button onClick={onCloseModal} className="text-white bg-red-500 p-2 rounded">{actionButton}</button>

                <Link
                  to={`/product-details/${id}/${name}`}
                  className="border-red-500 p-1 mr-4 font-semibold
                  rounded hover:bg-red-500 hover:text-white 
                  transition:ease-out duration-1000
                  border-2 flex items-center text-red-500"
                >
                  <IonIcon
                    icon={eyeOutline}
                    style={{ fontSize: '1.5rem' }}
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
