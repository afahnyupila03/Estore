import {
  collection,
  getDocs,
  setDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { database } from "../FirebaseConfigs/Firesbase";

export const postCartItemService = async (items, userData, orderedItems) => {
  try {
    const response = await fetch(items, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userData,
        orderedItems: orderedItems,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const ViewCheckoutProducts = async (userId) => {
  try {
    const db = database;
    const checkoutRef = collection(db, userId + "/checkout/" + "products");
    const q = query(checkoutRef, orderBy("timestamp", "desc"), limit(1));
    const querySnapshot = await getDocs(q);

    const checkoutData = [];
    querySnapshot.forEach((doc) => {
      checkoutData.push({
        id: doc.id,
        product: doc.data().product,
        totalProducts: doc.data().totalProducts,
        totalAmount: doc.data().totalAmount,
      });
    });
    return checkoutData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCartItemsService = async (items) => {
  try {
    const response = await fetch(items);
    const data = await response.json();
    const loadedItems = [];
    for (const cartItemsKey in data) {
      loadedItems.push({
        id: cartItemsKey,
        image: data[cartItemsKey].image,
        name: data[cartItemsKey].name,
        price: data[cartItemsKey].price,
      });
    }
    return loadedItems;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const trendingNearYouProductsService = async () => {};

export const trendingNearYouProductService = async () => {};
