import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";

export default function Card({
  title,
  link,
  route,
  linkStyle,
  icon,
  cardText,
}) {
  return (
    <div className="border-2 border-black rounded-lg p-4">
      <div className="flex justify-between items-center p-2">
        <h3>{title}</h3>
        <Link to={route} style={linkStyle}>
          {link}
        </Link>
      </div>
      <hr className="border-2 border-black width-full" />
      <div className="p-2 flex justify-center">
        <p>{cardText}</p>
        <div className="flex items-center">
          <IonIcon icon={icon} />
        </div>
        <Link to={route}>{link}</Link>
      </div>
    </div>
  );
}
