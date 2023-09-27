import MenAccessories from "../../Components/ManAccessories/man-accessories.js.js";
import { useQuery } from "react-query";
import { getMenAccessoriesProductsService } from "../../Services/ShopService/ShopService.js";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

const ManAccessories = () => {
  const {
    data: menProducts = [],
    isFetching,
    isError,
    error,
    refetch
  } = useQuery("menQUery", () => getMenAccessoriesProductsService());

  let content;

  if (isFetching) {
    content = (
      <div>
        <UseAnimations animation={loading} />
      </div>
    );
  } else if (isError) {
    content = (
      <div>
      <p>{error.message}</p>
        <button onClick={() => refetch()}>refetch</button>
      </div>
    )
  } else {
    content = (
      <div>
        {menProducts.map((menAccess) => (
          <MenAccessories key={menAccess.id} menData={menAccess} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h3 style={{marginTop: '5rem'}}>Men product list</h3>
      {content}
    </div>
  );
};

export default ManAccessories;
