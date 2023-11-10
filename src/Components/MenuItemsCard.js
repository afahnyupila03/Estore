import { useState } from "react";
import { IonIcon } from "@ionic/react";
import { NavLink } from "react-router-dom";

export default function ({ style, icon, navigationRoute, navigationLink }) {
  // const [defaultElement] = useState('Link')

  return (
    <div className="group relative flex gap-x-2 rounded-lg hover:bg-gray-500">
      <div className="flex h-11 w-11 flex-none items-center justify-center ">
        <IonIcon icon={icon} style={{ fontSize: "1.5rem" }} />
      </div>
      <div>
        <NavLink
          style={style}
          to={navigationRoute}
          className="flex items-center mt-2"
        >
          {navigationLink}
        </NavLink>
      </div>
    </div>
  );
}
