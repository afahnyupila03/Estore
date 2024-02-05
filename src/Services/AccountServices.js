import { get, ref, onValue, remove } from "firebase/database";
import { database } from "../FirebaseConfigs/Firesbase"; // Assuming you have initialized your Firebase app and exported the database instance as 'database'

export const DeliveryServices = async (userId) => {
  try {
    const dbRef = ref(database, userId + "/delivery/");
    const snapshot = await get(dbRef);
    const data = snapshot.val();

    console.log("Delivery: ", data);

    const deliveryInfo = [];
    for (const key in data) {
      deliveryInfo.push({
        id: key,
        firstName: data[key].firstName,
        lastName: data[key].lastName,
        address: data[key].address,
        state: data[key].state,
        apt: data[key].apt,
        city: data[key].city,
        zip: data[key].zip,
      });
    }
    return deliveryInfo;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const DeliveryAddressService = async (userId, deliveryId) => {
  try {
    const dbRef = ref(database, `${userId}/delivery/${deliveryId}`);
    const snapshot = await get(dbRef);
    const data = snapshot.val();
    console.log("Single address:", data);
    const deliveryAddress = {
      id: deliveryId,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      state: data.state,
      apt: data.apt,
      city: data.city,
      zip: data.zip,
    };
    return deliveryAddress;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PaymentMethodServices = async (userId) => {
  try {
    const dbRef = ref(database, userId + "/payment-method/");
    const snapshot = await get(dbRef);
    const data = snapshot.val();

    console.log("Payment card:", data);

    const paymentInfor = [];
    for (const key in data) {
      paymentInfor.push({
        id: key,
        firstName: data[key].firstName,
        lastName: data[key].lastName,
        cardNumber: data[key].cardNumber,
        expiryDate: data[key].expiryDate,
        securityCode: data[key].securityCode,
      });
    }
    return paymentInfor;
  } catch (error) {
    return Promise.reject(error);
  }
};
