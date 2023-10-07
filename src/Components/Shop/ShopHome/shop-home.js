import React from "react";
import NewArrivals from "../../New Arrivals/NewArrivals";
import PopularItemsCard from "../../Popular Items/PopularItems";


export default function ShopHome() {
    return <React.Fragment>
        <NewArrivals />
        <PopularItemsCard />
    </React.Fragment>

}