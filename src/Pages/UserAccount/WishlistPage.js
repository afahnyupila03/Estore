import React from "react";
import { IonIcon } from "@ionic/react";
import { shareOutline } from "ionicons/icons";
import { Link } from "react-router-dom";

export default function WishlistPage() {
  const wishlistItems = 0;

  let wishlist;

  if (wishlistItems === 0) {
    wishlist = (
      <div>
        <div className="mt-4">
          <h1>Your list is empty</h1>
        </div>
        <div className="mt-4">
          <p>
            Add items to your list by shopping the site.
            <br />
            Then, share your list so friends and family know what you love.
          </p>
        </div>
        <div className="mt-4">
          <Link to="/home" className="p-2 bg-black text-white">
            Shop now
          </Link>
        </div>
      </div>
    );
  } else {
    wishlist = (
      <div>
        <h1>Good to go</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold font-mono">Wish List</h1>
        <div className="flex items-center">
          <IonIcon icon={shareOutline} className="mr-2" />
          <p>Share</p>
        </div>
      </div>
      {wishlist}
    </div>
  );
}
