import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  addDoc,
} from "firebase/firestore";
import { database } from "../FirebaseConfigs/Firesbase";



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
  } catch (err) {
    return Promise.reject(err instanceof Error ? err : new Error(err));
  }
};

