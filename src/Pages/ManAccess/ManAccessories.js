import MenAccessories from "../../Components/ManAccessories/man-accessories.js.js";
import { useQuery } from "react-query";
import { getMenAccessoriesProductsService } from "../../Services/ShopService/ShopService.js";

const ManAccessories = () => {
  const { data: menProducts = [] } = useQuery("menQUery", () =>
    getMenAccessoriesProductsService()
  );

  return (
    <div>
      <h3>Men product list</h3>
      {menProducts.map((menAccess) => (
        <MenAccessories key={menAccess.id} menData={menAccess} />
      ))}
    </div>
  );
};

export default ManAccessories;
