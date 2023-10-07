import { Link } from "react-router-dom";
import { bag } from "react-icons-kit/ionicons/bag";
import IconName from "../../../Components/Icon";

export default function () {
  return (
    <Link to="cart">
      <IconName icon={bag} size={35} style={{ color: "white" }} />
    </Link>
  );
}
