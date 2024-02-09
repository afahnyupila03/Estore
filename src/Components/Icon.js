import React from "react";
import { IonIcon } from "@ionic/react";

export default function Icon({ size, color, icon, style, actionButton }) {
  return (
    <IonIcon
      icon={icon}
      style={style}
      color={color}
      size={size}
      onClick={actionButton}
    />
  );
}
