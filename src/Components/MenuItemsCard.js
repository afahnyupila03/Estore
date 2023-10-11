import {useState} from 'react'
import { IonIcon } from "@ionic/react";
import { Link } from "react-router-dom";

export default function ({ icon, navigationRoute, navigationLink }) {

  // const [defaultElement] = useState('Link')

  return (
    <div className="group relative flex gap-x-2 rounded-lg hover:bg-gray-50">
      <div className="flex h-11 w-11 flex-none items-center justify-center ">
        <IonIcon icon={icon} style={{ fontSize: "1.5rem" }} />
      </div>
      <div>
        <Link href={navigationRoute} className="flex items-center mt-2">
          {navigationLink}
        </Link>
      </div>
    </div>
  );
}
