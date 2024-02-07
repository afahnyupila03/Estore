import { database } from "../FirebaseConfigs/Firesbase"; // Assuming you have initialized your Firebase app and exported the database instance as 'database'
import { doc, getDoc, collection, getDocs, query } from "firebase/firestore";

export const DeliveryServices = async (userId) => {
  try {
    const deliveriesRef = collection(
      database,
      userId + "/delivery/" + "addressMe"
    );
    const q = query(deliveriesRef);
    const querySnapshot = await getDocs(q);

    const deliveryInfo = [];
    querySnapshot.forEach((doc) => {
      deliveryInfo.push({
        id: doc.id,
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
        address: doc.data().address,
        state: doc.data().state,
        apt: doc.data().apt,
        city: doc.data().city,
        zip: doc.data().zip,
      });
    });
    return deliveryInfo;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const DeliveryAddressService = async (userId, addressId) => {
  try {
    const addressRef = doc(
      database,
      userId + "/delivery" + "/addressMe/" + addressId
    );
    const docSnapshot = await getDoc(addressRef);

    if (docSnapshot.exists()) {
      const addressData = {
        id: docSnapshot.id,
        firstName: docSnapshot.data().firstName,
        lastName: docSnapshot.data().lastName,
        address: docSnapshot.data().address,
        state: docSnapshot.data().state,
        apt: docSnapshot.data().apt,
        city: docSnapshot.data().city,
        zip: docSnapshot.data().zip,
      };
      console.log(addressData.id);
      return addressData;
    } else {
      return null; // Document not found
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchDeliveryId = async (userId) => {
  try {
    const deliveryIdRef = doc(database, userId + "/delivery/" + "addressMe");
    const deliveryIdSnapshot = await getDoc(deliveryIdRef);

    if (deliveryIdSnapshot.exists()) {
      const deliveryId = deliveryIdSnapshot.data()?.id;
      return deliveryId || "defaultDeliveryId";
    } else {
      return "defaultDeliveryId";
    }
  } catch (error) {
    console.log("Error fetching deliveryId:", error.message);
    throw error;
  }
};

export const PaymentMethodServices = async (userId) => {
  try {
    const paymentRef = collection(
      database,
      userId + "/payment-method/" + "bankCard"
    );
    const q = query(paymentRef);
    const querySnapshot = await getDocs(q);

    const paymentInfo = [];
    querySnapshot.forEach((doc) => {
      paymentInfo.push({
        id: doc.data().id,
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
        cardNumber: doc.data().cardNumber,
        expiryDate: doc.data().expiryDate,
        securityCode: doc.data().securityCode,
      });
    });
    // console.log(paymentInfo.)
    return paymentInfo;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PaymentMethodService = async (userId, paymentId) => {
  try {
    const paymentRef = doc(
      database,
      `${userId}/payment-method/bankCard/${paymentId}`
    );
    const paymentSnapshot = await getDoc(paymentRef);

    if (paymentSnapshot.exists()) {
      const paymentMethod = {
        id: paymentSnapshot.data().id,
        firstName: paymentSnapshot.data().firstName,
        lastName: paymentSnapshot.data().lastName,
        cardNumber: paymentSnapshot.data().cardNumber,
        expiryDate: paymentSnapshot.data().expiryDate,
        securityCode: paymentSnapshot.data().securityCode,
      };
      console.log(paymentMethod.id);
      return paymentMethod;
    } else {
      return null;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchPaymentId = async (userId) => {
  try {
    const paymentIdRef = doc(database, `${userId}/payment-method/bankCard/`);
    const paymentIdSnapshot = await getDoc(paymentIdRef);

    if (paymentIdSnapshot.exists()) {
      return paymentIdSnapshot.data().id;
    } else {
      return "defaultPaymentId";
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
