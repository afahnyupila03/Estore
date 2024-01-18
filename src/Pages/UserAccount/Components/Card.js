import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";

export default function Card({
  title,
  link,
  route,
  linkStyle,
  icon,
  cardText,
  actionLink,
  actionRoute,
  route2,
  link2,
  link2Style,
  className,
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
      <div className="p-2">
        <p className="self-center">{cardText}</p>
        <div className="flex flex-row items-center justify-center">
          <IonIcon icon={icon} />
          <Link to={actionRoute}>{actionLink}</Link>
        </div>
        <Link className={className} style={link2Style} to={route2}>
          {link2}
        </Link>
      </div>
    </div>
  );
}
