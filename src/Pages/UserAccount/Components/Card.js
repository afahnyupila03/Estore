import { Link } from "react-router-dom";

export default function Card({
  actionHeader,
  actionText,
  image,
  imageName,
  actionButton,
}) {
  return (
    <Link to="#">
      <div className="flex items-center">
        <div className="mr-8">
          <h2 className="p-2">{actionHeader}</h2>
          <p className="p-2">{actionText}</p>
          <Link to="#" className="underline p-2">
            {actionButton}
          </Link>
        </div>
        <div>
          <img src={image} alt={imageName} />
        </div>
      </div>
    </Link>
  );
}
