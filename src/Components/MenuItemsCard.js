import { IonIcon } from "@ionic/react";
import { Link } from "react-router-dom";

export default function ({ style, icon, navigationRoute, navigationLink }) {
  // const [defaultElement] = useState('Link')

  return (
    <Link to={navigationRoute}>
      <div className="group relative flex gap-x-2 rounded-lg hover:bg-red-300 hover:text-white">
        <div className="flex h-11 w-11 flex-none items-center justify-center ">
          <IonIcon icon={icon} style={{ fontSize: "1.5rem" }} />
        </div>
        <div>
          <Link
            style={style}
            to={navigationRoute}
            className="flex font-mono items-center mt-2"
          >
            {navigationLink}
          </Link>
        </div>
      </div>
    </Link>
  );
}
