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
  actionStyle,
  cardStyle
}) {
  return (
    <div style={cardStyle} className="border-2 border-black rounded-lg p-4">
      <div className="flex justify-between items-center p-2">
        <h3>{title}</h3>
        <Link to={route} style={linkStyle}>
          {link}
        </Link>
      </div>
      <hr className="border-2 border-black width-full" />
      <div className="p-2">
        <p style={{textAlign: "center", marginRight: "2rem"}}>{cardText}</p>
        <div className="flex flex-row items-center" style={actionStyle}>
          <IonIcon icon={icon} />
          <Link to={actionRoute} >{actionLink}</Link>
        </div>
        <Link className={className} style={link2Style} to={route2}>
          {link2}
        </Link>
      </div>
    </div>
  );
}
