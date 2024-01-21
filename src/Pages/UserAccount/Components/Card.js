import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";

export default function Card({
  headerText,
  headerLink,
  icon,
  bodyLink,
  bodyDescription,
  hr,
  footerLink,
}) {
  return (
    <div>
      <div className="border-2 border-black rounded">
        <div className="flex justify-between text-lg font-mono font-semibold items-center p-2">
          <h4>{headerText}</h4>
          <Link to="#" className="underline">
            {headerLink}
          </Link>
        </div>
        <hr className=" border-black" style={{ borderWidth: ".1rem" }} />
        <div className="flex flex-col justify-start font-mono text-lg font-semibold">
          <Link to="#" className="items-center flex">
            <IonIcon
              icon={icon}
              className="mr-2"
              style={{ fontSize: "1.5rem" }}
            />
            {bodyLink}
          </Link>
          <p className="flex justify-start">{bodyDescription}</p>
        </div>
        {hr && (
          <hr
            className="m-2 mb-2 border-black"
            style={{ borderWidth: ".1rem" }}
          />
        )}
        <div>
          <Link
            to="#"
            className="p-2 mt-4 bg-black font-mono text-lg  text-white rounded"
          >
            {footerLink}
          </Link>
        </div>
      </div>
    </div>
  );
}
