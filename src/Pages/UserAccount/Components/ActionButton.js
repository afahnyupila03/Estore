import React from "react";
import { IonIcon } from "@ionic/react";

export default function ActionButton({ actionButton, icon, style }) {
  return <IonIcon icon={icon} style={style} onClick={actionButton} />;
}
