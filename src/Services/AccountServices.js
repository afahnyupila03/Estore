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
      userId + "/delivery/" + "addressMe/" + addressId
    );
    const docSnapshot = await getDoc(addressRef);

    if (docSnapshot.exists()) {
      const addressData = {
        id: addressId,
        firstName: docSnapshot.data().firstName,
        lastName: docSnapshot.data().lastName,
        address: docSnapshot.data().address,
        state: docSnapshot.data().state,
        apt: docSnapshot.data().apt,
        city: docSnapshot.data().city,
        zip: docSnapshot.data().zip,
      };
      console.log("service address:", addressData);
      return addressData;
    } else {
      return null || "Error loading address card details";
    }
  } catch (error) {
    return Promise.reject(error);
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
        id: doc.id,
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
        id: paymentId,
        firstName: paymentSnapshot.data().firstName,
        lastName: paymentSnapshot.data().lastName,
        cardNumber: paymentSnapshot.data().cardNumber,
        expiryDate: paymentSnapshot.data().expiryDate,
        securityCode: paymentSnapshot.data().securityCode,
      };
      console.log("payment service:", paymentMethod);
      return paymentMethod;
    } else {
      return null || "Error loading payment card details";
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PurchaseServices = async (userId) => {
  try {
    const db = database;
    const purchaseRef = collection(db, userId + "/purchase/" + "products");
    const q = query(purchaseRef);
    const purchaseSnapShot = await getDocs(q);

    const purchaseData = [];
    purchaseSnapShot.forEach((doc) => {
      purchaseData.push({
        id: doc.id,
        purchaseId: doc.data().purchaseId,
        address: doc.data().address,
        city: doc.data().city,
        checkoutTotal: doc.data().checkoutTotal,
        displayName: doc.data().displayName,
        email: doc.data().email,
        productData: doc.data().productData,
        productQuantity: doc.data().productQuantity,
        shippingPrice: doc.data().shippingPrice,
        state: doc.data().state,
        tax: doc.data().tax,
        tel: doc.data().tel,
        timeOfOrder: doc.data().timeOfOrder,
        dayOfOrder: doc.data().dayOfOrder,
        cardNumber: doc.data().cardNumber,
      });
    });
    return purchaseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const PurchaseService = async (userId, serviceId) => {
  try {
    const purchaseRef = doc(
      database,
      userId + "/purchase/" + "products/" + serviceId
    );

    const purchaseSnapshot = await getDoc(purchaseRef);

    if (purchaseSnapshot.exists()) {
      const purchaseData = {
        id: serviceId,
        purchaseId: purchaseSnapshot.data().purchaseId,
        address: purchaseSnapshot.data().address,
        city: purchaseSnapshot.data().city,
        checkoutTotal: purchaseSnapshot.data().checkoutTotal,
        displayName: purchaseSnapshot.data().displayName,
        email: purchaseSnapshot.data().email,
        productData: purchaseSnapshot.data().productData,
        productQuantity: purchaseSnapshot.data().productQuantity,
        shippingPrice: purchaseSnapshot.data().shippingPrice,
        state: purchaseSnapshot.data().state,
        tax: purchaseSnapshot.data().tax,
        timeOfOrder: purchaseSnapshot.data().timeOfOrder,
        dayOfOrder: purchaseSnapshot.data().dayOfOrder,
      };
      console.log("service products: ", purchaseData);
      return purchaseData;
    } else {
      return null || "Invoice doesn't exist";
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
