// TODO: WHEN WRITING CHECKOUT DATA TO DATABASE...DIRECTLY PASS
// THE VALUES OF THE DELIVERY_VALUES & SHIPPING_COST

import { Field, Form, Formik } from "formik";
import CustomTextInput, {
  CustomCheckbox,
  CustomSelect,
} from "../../Components/TextInput";
import SummaryCardItems from "./Components/SummaryCardItems";
import { useAuth, useCart } from "../../Store";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import loading from "react-useanimations/lib/loading";
import {
  DeliveryServices,
  PaymentMethodServices,
} from "../../Services/AccountServices";
import Divider from "../../Components/Divider";
import Loader from "../../Components/Loader";
import { ViewCheckoutProducts } from "../../Services/CartService";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { database } from "../../FirebaseConfigs/Firesbase";
import { useTranslation } from "react-i18next";

export default function CheckOutForm() {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [otherState, setOtherState] = useState(false);
  const [otherAddress, setOtherAddress] = useState(false);
  const [otherCity, setOtherCity] = useState(false);
  const [otherApt, setOtherApt] = useState(false);
  const [otherCardNumber, setOtherCardNumber] = useState(false);
  const [deliveryValues, setDeliveryValues] = useState({
    standard: false,
    express: false,
  });
  const [markChecked, setMarkChecked] = useState({
    standard: false,
    express: false,
  });
  const [shippingPrice, setShippingPrice] = useState(0);
  const [taxIsLoading, setTaxIsLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [taxes, setTaxes] = useState(0);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const { user } = useAuth();
  const { removeProductHandler, clearProductHandler } = useCart();

  const {t} = useTranslation()

  const splitUserName = (userName) => {
    if (!userName) {
      return { first: "", last: "" };
    }
    const names = userName.split(" ");
    const first = names[0] || "";
    const last = names.slice(1).join(" ") || "";
    return { first, last };
  };

  const userEmail = user?.email;
  const userName = user?.displayName;
  const userId = user?.uid;

  const {
    data: deliveryAddresses = [],
    isLoading: addressLoading,
    error: addressError,
  } = useQuery(["address", userId], () => DeliveryServices(userId));
  const {
    data: paymentMethods = [],
    isLoading: paymentLoading,
    error: paymentError,
  } = useQuery(["payments", userId], () => PaymentMethodServices(userId));

  const {
    data: checkoutData = [],
    isLoading: checkoutIsLoading,
    refetch: checkoutRefetch,
    isError: checkoutIsError,
    error: checkoutError,
  } = useQuery(["checkoutData", userId], () => ViewCheckoutProducts(userId));
  console.log(checkoutData);
  const productQuantity = checkoutData.map((checkout) => {
    const { totalProducts } = checkout;
    return totalProducts;
  });
  const checkoutId = checkoutData.map((checkout) => {
    const { id } = checkout;
    return id;
  });
  const productData = checkoutData.map((productInfo) => {
    const { product } = productInfo;

    return product;
  });
  const productTotalPrice = checkoutData.map((total) => {
    const { totalAmount } = total;
    return totalAmount;
  });

  useEffect(() => {
    const { first, last } = splitUserName(userName);
    setUserFirstName(first);
    setUserLastName(last);
  }, [userName]);

  const handleDeliveryValues = (e) => {
    const { name, checked } = e.target;
    if (name === "standard") {
      setDeliveryValues({ standard: checked, express: !checked });
      setMarkChecked({ standard: checked, express: !checked });
    } else if (name === "express") {
      setDeliveryValues({ standard: !checked, express: checked });
      setMarkChecked({ standard: !checked, express: checked });
    }
  };

  const MONEY_FORMATTER = (amount, currency) => {
    const formatter = new Intl.NumberFormat("fr", {
      style: "currency",
      currency: currency,
    });
    return formatter.format(amount);
  };
  const CURRENCY = "XAF";
  const STANDARD = MONEY_FORMATTER(6000, CURRENCY);
  const EXPRESS = MONEY_FORMATTER(10000, CURRENCY);

  const EXPRESS_PRICE = parseInt(EXPRESS.replace(/\D/g, ""));
  const STANDARD_PRICE = parseInt(STANDARD.replace(/\D/g, ""));

  const SHIPPING_COST = () => {
    if (deliveryValues.standard === true) {
      return STANDARD_PRICE;
    } else if (deliveryValues.express === true) {
      return EXPRESS_PRICE;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    if (deliveryValues.standard === true) {
      console.log("useEffect price: ", shippingPrice);
      setShippingPrice(STANDARD_PRICE);
    } else if (deliveryValues.express === true) {
      console.log("useEffect price: ", shippingPrice);
      setShippingPrice(EXPRESS_PRICE);
    } else {
      setShippingPrice(0);
    }
  }, [deliveryValues.standard, deliveryValues.express]);

  const handleTaxesCalc = (productPrice) => {
    setTaxIsLoading(true);

    const VAT = productPrice ? 0.1925 : 0;
    const INCOME_TAX = productPrice ? 0.3333 : 0;
    const STAMP_DUTY = productPrice ? 2000 : 0;

    const GOVT_TAX = productPrice * (VAT * INCOME_TAX);
    const calculateTaxes = GOVT_TAX && GOVT_TAX + STAMP_DUTY;

    setTimeout(() => {
      setTaxIsLoading(false);
      setTaxes(calculateTaxes);
    }, 2000);
  };

  const handleCheckoutTotal = (productPrice, taxes, shippingPrice) => {
    setCheckoutLoading(true);

    const numericProductPrice = parseFloat(productPrice);
    const numericTaxes = parseFloat(taxes);
    const numericShippingPrice = parseFloat(shippingPrice);

    const calculateCheckoutTotal =
      numericProductPrice + numericTaxes + numericShippingPrice;

    setTimeout(() => {
      setCheckoutLoading(false);
      setCheckoutTotal(calculateCheckoutTotal);
    }, 2000);
  };

  useEffect(() => {
    if (checkoutData) {
      handleTaxesCalc(productTotalPrice);
    }
  }, [checkoutData]);

  useEffect(() => {
    if (SHIPPING_COST() && checkoutData) {
      handleCheckoutTotal(productTotalPrice, SHIPPING_COST(), taxes);
    }
  }, [SHIPPING_COST(), checkoutData, taxes]);

  const purchaseId = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const uniqueCode = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(8, "0");

    return `INV-${year}-${month}-${uniqueCode}`;
  };

  const checkFormSubmitHandler = async (values, actions) => {
    try {
      const timeOfOrder = new Date().toTimeString().split(" ")[0];
      const dayOfOrder = new Date().toDateString();
      const checkoutProduct = productData.map(
        ({ description, stock, images, rating, ...rest }) => rest
      );
      const purchaseRef = collection(
        database,
        userId,
        "/purchase/",
        "/products/"
      );
      await addDoc(purchaseRef, {
        productData: checkoutProduct,
        productQuantity: productQuantity,
        tax: taxes,
        checkoutTotal: checkoutTotal,
        shippingPrice: shippingPrice,
        purchaseId: purchaseId(),
        email: values.email,
        displayName: `${values.firstName} ${values.lastName}`,
        address: values.address,
        city: values.city,
        state: values.state,
        tel: values.tel,
        cardNumber: values.cardNumber,
        timeStamp: serverTimestamp(),
        timeOfOrder: timeOfOrder,
        dayOfOrder: dayOfOrder,
      });

      alert("added to purchase");

      /* actions.resetForm({
        values: {
          email: userEmail,
          firstName: userFirstName,
          lastName: userLastName,
          company: "",
          address: "",
          aptSuite: "",
          city: "",
          state: "",
          postalCode: "",
          tel: "",
          standard: deliveryValues.standard,
          express: deliveryValues.express,
          cardNumber: "",
          cardHolder: "",
          expiryDate: "",
          cvc: "",
          finalPrice: checkoutTotal,
          tax: taxes,
        },
      }); */

      const checkoutRef = doc(
        database,
        userId + "/checkout/" + "products/" + checkoutId
      );
      await deleteDoc(checkoutRef);
      alert("delete success");
    } catch (error) {
      console.error("Error deleting", error);
      alert("error deleting", error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto mt-4 lg:px-4">
      <Formik
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          company: "",
          address: "",
          aptSuite: "",
          city: "",
          state: "",
          postalCode: "",
          tel: "",
          standard: markChecked.standard,
          express: markChecked.express,
          shippingPrice: shippingPrice,
          cardNumber: "",
          cardHolder: "",
          expiryDate: "",
          cvc: "",
          deliveryAmount: SHIPPING_COST(),
        }}
        onSubmit={checkFormSubmitHandler}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <div className="flex gap-x-5 justify-around">
              {/* User Shipping Information */}
              <div>
                <h1 className="mb-2 text-lg font-mono font-semibold">
                  {t("checkoutForm.contactInfo")}
                </h1>
                <Field
                  component={CustomTextInput}
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label={t("checkoutForm.email")}
                  placeholder={t("checkoutForm.email")}
                  autoComplete="false"
                />

                <Divider
                  style={{ marginTop: "0.7rem", marginBottom: "0.7rem" }}
                />

                <h1 className="mb-2 text-lg font-mono font-semibold">
                {t("checkoutForm.shippingInfo")}
                </h1>
                <div className="flex justify-between items-center">
                  <Field
                    component={CustomTextInput}
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={t("checkoutForm.firstName")}
                    placeholder={t("checkoutForm.firstName")}
                    autoComplete="true"
                  />

                  <Field
                    component={CustomTextInput}
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={t("checkoutForm.lastName")}
                    placeholder={t("checkoutForm.lastName")}
                    autoComplete="true"
                  />
                </div>

                <div className="flex justify-between items-center">
                  {otherAddress ? (
                    <Field
                      component={CustomTextInput}
                      name="address"
                      type="text"
                      value={values.address}
                      label={t("checkoutForm.address")}
                      placeholder="Enter address"
                      id="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="false"
                    />
                  ) : (
                    <div className="grid">
                      <label htmlFor="address" className="font-semibold font-mono" id="address">
                      {t("checkoutForm.address")}
                      </label>
                      <Field
                        component="select"
                        id="address"
                        name="address"
                        placeholder={t("checkoutForm.selectAddress")}
                        label="Address"
                        onChange={(e) => {
                          if (e.target.value === "otherAddress") {
                            setOtherAddress(true);
                          } else {
                            setOtherAddress(false);
                          }
                        }}
                        style={{
                          backgroundColor: "#9ca3af",
                          borderRadius: ".4rem",
                          padding: ".5rem",
                          textAlign: "left",
                          margin: ".5rem",
                          width: "20rem",
                          color: "#020617",
                          
                        }}
                      >
                        <option value="address">{t("checkoutForm.selectAddress")}</option>
                        {deliveryAddresses.map((deliveryAddress) => {
                          const { id, address } = deliveryAddress;
                          return (
                            <option value={address} key={id}>
                              {address}
                            </option>
                          );
                        })}
                        <option value="otherAddress">
                        {t("checkoutForm.other")}
                        </option>
                      </Field>
                    </div>
                  )}

                  {otherApt ? (
                    <Field
                      component={CustomTextInput}
                      id="aptSuite"
                      name="aptSuite"
                      type="text"
                      value={values.aptSuite}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="true"
                      label={t("checkoutForm.apartment")}
                    />
                  ) : (
                    <div className="grid">
                      <label htmlFor="apt" className="font-semibold font-mono">
                      {t("checkoutForm.apartment")}
                      </label>
                      <Field
                        component="select"
                        name="apt"
                        placeholder={t("checkoutForm.selectApart")}
                        label={t("checkoutForm.apartment")}
                        onChange={(e) => {
                          if (e.target.value === "otherApt") {
                            setOtherApt(true);
                          } else {
                            setOtherApt(false);
                          }
                        }}
                        style={{
                          backgroundColor: "#9ca3af",
                          borderRadius: ".4rem",
                          padding: ".5rem",
                          textAlign: "left",
                          margin: ".5rem",
                          width: "20rem",
                          color: "#020617",
                        }}
                      >
                        <option value="apt">{t("checkoutForm.selectApart")}</option>
                        {deliveryAddresses.map((deliveryApt) => {
                          const { id, apt } = deliveryApt;
                          return (
                            <option key={id} value={apt}>
                              {apt}
                            </option>
                          );
                        })}
                        <option value="otherApt">{t("checkoutForm.other")}</option>
                      </Field>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  {otherCity ? (
                    <Field
                      component={CustomTextInput}
                      name="city"
                      type="text"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label={t("delivery.city")}
                      placeholder="City"
                      id="city"
                      autoComplete="false"
                    />
                  ) : (
                    <div className="grid">
                      <label htmlFor="city" className="font-semibold font-mono" id="city">
                      {t("delivery.city")}
                      </label>
                      <Field
                        name="city"
                        id="city"
                        component="select"
                        placeholder={t("delivery.selectCity")}
                        onChange={(e) => {
                          if (e.target.value === "otherCity") {
                            setOtherCity(true);
                          } else {
                            setOtherCity(false);
                          }
                        }}
                        onBlur={handleBlur}
                        style={{
                          backgroundColor: "#9ca3af",
                          borderRadius: ".4rem",
                          padding: ".5rem",
                          textAlign: "left",
                          margin: ".5rem",
                          width: "20rem",
                          color: "#020617",
                        }}
                      >
                        <option value="city">{t("checkoutForm.selectCity")}</option>
                        {deliveryAddresses.map((deliveryCity) => {
                          const { id, city } = deliveryCity;
                          return (
                            <option value={city} key={id}>
                              {city}
                            </option>
                          );
                        })}
                        <option value="otherCity">
                        {t("checkoutForm.other")}
                        </option>
                      </Field>
                    </div>
                  )}

                  {otherState ? (
                    <Field
                      component={CustomTextInput}
                      type="text"
                      name="state"
                      id="state"
                      label={t("checkoutForm.state")}
                      placeholder={t("checkoutForm.state")}
                      autoComplete="false"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.state}
                    />
                  ) : (
                    <div className="grid">
                      <label htmlFor="state" className="font-semibold font-mono" id="state">
                      {t("checkoutForm.state")}
                      </label>
                      <Field
                        name="state"
                        id="state"
                        as="select"
                        placeholder={t("checkoutForm.state")}
                        label={t("checkoutForm.state")}
                        onChange={(e) => {
                          if (e.target.value === "otherState") {
                            setOtherState(true);
                          } else {
                            setOtherState(false);
                          }
                        }}
                        style={{
                          backgroundColor: "#9ca3af",
                          borderRadius: ".4rem",
                          padding: ".5rem",
                          textAlign: "left",
                          margin: ".5rem",
                          width: "20rem",
                          color: "#020617",
                        }}
                      >
                        <option value="state">{t("checkoutForm.selectState")}</option>
                        {deliveryAddresses.map((deliveryState) => {
                          const { id, state } = deliveryState;
                          return (
                            <option key={id} value={state}>
                              {state}
                            </option>
                          );
                        })}
                        <option value="otherState">
                        {t("checkoutForm.other")}
                        </option>
                      </Field>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <Field
                    component={CustomTextInput}
                    id="tel"
                    name="tel"
                    type="tel"
                    value={values.tel}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="false"
                    label={t("checkoutForm.phone")}
                  />
                  <Field
                    component={CustomTextInput}
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    value={values.postalCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="false"
                    label={t("checkoutForm.postalCode")}
                  />
                </div>

                <Divider
                  style={{ marginTop: "0.7rem", marginBottom: "0.7rem" }}
                />

                {/* Delivery Methods. */}
                <h1 className="mb-2 text-lg font-mono font-semibold">
                {t("checkoutForm.deliveryMethod")}
                </h1>
                <div
                  role="group"
                  aria-labelledby="my-radio-group"
                  className="flex justify-around items-center"
                >
                  <div className="border-2 border-black rounded p-4">
                    <h1 className="text-center flex justify-center">
                    {t("checkoutForm.standard")}
                    </h1>
                    <div className="flex justify-around gap-x-10 items-center">
                      <div>
                        <p>4-10 {t("checkoutForm.businessDays")}</p>
                      </div>
                      <div>
                        <Field
                          component={CustomCheckbox}
                          name="standard"
                          id="standard"
                          type="radio"
                          value={values.standard}
                          checked={markChecked.standard}
                          onChange={handleDeliveryValues}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    <p>{STANDARD}</p>
                  </div>

                  <div className="border-2 border-black rounded p-4">
                    <h1 className="text-center flex justify-center">{t("checkoutForm.express")}</h1>
                    <div className="flex justify-around gap-x-10 items-center">
                      <div>
                        <p>2-5 {t("checkoutForm.businessDays")}</p>
                      </div>

                      <div>
                        <Field
                          component={CustomCheckbox}
                          name="express"
                          id="express"
                          type="radio"
                          checked={markChecked.express}
                          value={values.standard}
                          onChange={handleDeliveryValues}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    <p>{EXPRESS}</p>
                  </div>
                </div>

                <Divider
                  style={{ marginTop: "0.7rem", marginBottom: "0.7rem" }}
                />
                {/* Payment Methods */}
                <h1 className="mb-2 text-lg font-mono font-semibold">
                {t("checkoutForm.payment")}
                </h1>
                <div className="flex justify-between reverse">
                  <Field
                    component={CustomTextInput}
                    id="cardHolder"
                    name="cardHolder"
                    type="text"
                    label={t("checkoutForm.nameOnCard")}
                    value={values.cardHolder}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="false"
                  />

                  {otherCardNumber ? (
                    <Field
                      component={CustomTextInput}
                      id="cardNumber"
                      name="cardNumber"
                      type="text"
                      label={t("checkoutForm.cardNumber")}
                      value={values.cardNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      renderCardImage={true}
                      autoComplete="false"
                    />
                  ) : (
                    <div className="grid">
                      <label htmlFor="cardNumber" className="font-semibold font-mono" id="cardNumber">
                      {t("checkoutForm.cardNumber")}
                      </label>
                      <Field
                        as="select"
                        name="cardNumber"
                        id="cardNumber"
                        onChange={(e) => {
                          if (e.target.value === "otherCardNumber") {
                            setOtherCardNumber(true);
                          } else {
                            setOtherCardNumber(false);
                          }
                        }}
                        style={{
                          backgroundColor: "#9ca3af",
                          borderRadius: ".4rem",
                          padding: ".5rem",
                          textAlign: "left",
                          margin: ".5rem",
                          width: "20rem",
                          color: "#020617",
                        }}
                      >
                        <option value="cardNumber">{t("checkoutForm.selectCard")}</option>
                        {paymentMethods.map((paymentCard) => {
                          const { id, cardNumber } = paymentCard;
                          return (
                            <option key={id} value={cardNumber}>
                              {cardNumber}
                            </option>
                          );
                        })}
                        <option value="otherCardNumber">
                        {t("checkoutForm.other")}
                        </option>
                      </Field>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <div>
                    <Field
                      component={CustomTextInput}
                      id="expiryDate"
                      name="expiryDate"
                      type="text"
                      pattern="\d{2}/\d{2}"
                      label={t("checkoutForm.expiryDate")}
                      value={values.expiryDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="false"
                      required
                    />
                  </div>
                  <div>
                    <Field
                      component={CustomTextInput}
                      id="cvc"
                      name="cvc"
                      type="integer"
                      label={t("checkoutForm.cvc")}
                      value={values.cvc}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="false"
                    />
                  </div>
                </div>
              </div>

              {/* Product Summary Section. */}
              <div>
                <h1 className="mb-2 text-lg font-mono font-semibold">
                {t("checkoutForm.orderSummary")}
                </h1>

                {checkoutData.map((item) => {
                  const { totalAmount, totalProducts, product, id } = item;
                  return (
                    <div key={id}>
                      <div>
                        {!product ? (
                          <div className="mt-8">
                            <p className="mb-10 text-xl font-mono">
                            {t("checkoutForm.noProducts")}
                            </p>
                            <Link
                              to="/home"
                              className="bg-black text-center text-white py-6 px-14 rounded font-semibold text-xl font-mono"
                            >
                              {t("cart.continueShopping")}
                            </Link>
                          </div>
                        ) : (
                          product.map((summaryOrder) => (
                            <SummaryCardItems
                              summaryData={summaryOrder}
                              key={summaryOrder.id}
                              removeProductHandler={() =>
                                removeProductHandler(summaryOrder.id)
                              }
                            />
                          ))
                        )}
                      </div>
                      <Divider
                        style={{ marginTop: "0.7rem", marginBottom: "0.7rem" }}
                      />
                      {product && (
                        <div>
                          <div className="flex mt-2 justify-between items-center">
                            <p className="mb-2 text-lg font-mono font-semibold">
                            {t("checkoutForm.totalProducts")} :
                            </p>
                            <p className="text-gray-900 text-lg font-mono font-semibold">
                              {totalProducts}
                            </p>
                          </div>
                          <div className="flex mt-2 justify-between items-center">
                            <p className="mb-2 text-lg font-mono font-semibold">
                            {t("checkoutForm.subtotal")} :
                            </p>
                            <p className="text-gray-900 text-lg font-mono font-semibold">
                              {MONEY_FORMATTER(parseInt(totalAmount), CURRENCY)}
                            </p>
                          </div>
                          <div className="flex mt-2 justify-between items-center">
                            <p className="mb-2 text-lg font-mono font-semibold">
                            {t("checkoutForm.taxes")}                            </p>
                            <p className="text-gray-900 text-lg font-mono font-semibold">
                              {taxIsLoading ? (
                                <Loader animation={loading} size={20} />
                              ) : (
                                MONEY_FORMATTER(parseInt(taxes), CURRENCY)
                              )}
                            </p>
                          </div>
                          <div className="flex mt-2 justify-between items-center">
                            <p className="mb-2 text-lg font-mono font-semibold">
                            {t("checkoutForm.shipping")} :
                            </p>
                            <p className="text-gray-900 text-lg font-mono font-semibold">
                              {MONEY_FORMATTER(
                                parseInt(SHIPPING_COST()),
                                CURRENCY
                              )}
                            </p>
                          </div>

                          <Divider
                            style={{
                              marginTop: "0.7rem",
                              marginBottom: "0.7rem",
                            }}
                          />

                          <div className="flex mt-2 justify-between">
                            <p className="mb-2 text-lg font-mono font-semibold">
                            {t("checkoutForm.total")} :
                            </p>
                            <p className="text-gray-900 font-mono font-semibold">
                              {checkoutLoading ? (
                                <Loader animation={loading} size={20} />
                              ) : (
                                MONEY_FORMATTER(
                                  parseInt(checkoutTotal),
                                  CURRENCY
                                )
                              )}
                            </p>
                          </div>

                          <div className="flex justify-center mt-2">
                            <button
                              className="text-white text-center bg-black px-4 py-2 rounded"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              {isSubmitting
                                ? `${t("checkoutForm.loadingInvoice")}`
                                : `${t("checkoutForm.confirmOrder")}`}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
