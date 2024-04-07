import { trashOutline } from "ionicons/icons";
import Vote from "../../../Assets/vote-yes.png";
import Icon from "../../../Components/Icon";

export default function SummaryCardItems({
  summaryData,
  removeProductHandler,
}) {
  const {
    title,
    discountPercentage,
    price,
    thumbnail,
    category,
    brand,
    quantity,
  } = summaryData;

  return (
    <div className="flex gap-x-60 gap-y-2 items-center items-stretch font-mono text-xl justify-between">
      <div className="flex justify-between">
        <div className="flex justify-between aspect-h-1 aspect-w-1 w-40 overflow-hidden rounded-md bg-red-200 lg:aspect-none group-hover:opacity-75 lg:h-40">
          <img
            src={thumbnail}
            alt={title}
            className="h-40 w-40 fixed object-cover object-center lg:h-40 lg:w-40"
          />
        </div>

        <div className="p-4">
          <p>{title}</p>
          <p>{brand}</p>
          <p>{category}</p>
        </div>
      </div>

      <div className="grid">
        <Icon
          onClick={removeProductHandler}
          className="mr-2"
          icon={trashOutline}
          style={{ fontSize: "1.5rem" }}
        />
        <span>{quantity}</span>
      </div>
    </div>
  );
}
