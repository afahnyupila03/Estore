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
      <div className="flex items-center font-mono">
        <div className="mr-4">
          <h2 className="text-xl font-semibold">{actionHeader}</h2>
          <p className="text-lg">{actionText}</p>
          <Link to="#" className="underline text-lg">
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
