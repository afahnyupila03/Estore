import { Link } from "react-router-dom";

export default function Card({
  actionHeader,
  actionText,
  image,
  imageName,
  actionButton,
  imageClass,
}) {
  return (
    <Link to="#">
      <div className="gap-x-2 flex items-center font-mono">
        <div>
          <h2 className="text-sm md:text-sm lg:text-lg font-semibold">{actionHeader}</h2>
          <p className="text-sm md:text-sm lg:text-lg">{actionText}</p>
          <Link to="#" className="underline text-sm md:text-sm lg:text-lg">
            {actionButton}
          </Link>
        </div>
        <div>
          <img
            src={image}
            alt={imageName}
            className={`${imageClass} h-30 w-30 lg:w-full lg:h-full`}
          />
        </div>
      </div>
    </Link>
  );
}
