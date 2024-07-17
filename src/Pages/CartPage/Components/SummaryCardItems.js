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
    <div className="flex gap-x-60 gap-y-2 items-center items-stretch  text-xl justify-between">
      <div className="flex justify-between gap-x-4">
        <div className="aspect-h-1 aspect-w-full w-full rounded-md bg-red-200 lg:aspect-none group-hover:opacity-75 lg:h-40">
          <img
            src={thumbnail}
            alt={title}
            className="h-40 w-full fixed object-fit object-center bg-gray-900 rounded-md lg:w-full lg:h-40"
          />
          {/* <div className="pl-4">
            <p>{title}</p>
            <p>{brand}</p>
            <p>{category}</p>
          </div> */}
        </div>
        <div className="mx-auto px-2">
          <p>{title}</p>
          <p>{brand}</p>
        </div>
        {/* <p>{title}</p> */}
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
