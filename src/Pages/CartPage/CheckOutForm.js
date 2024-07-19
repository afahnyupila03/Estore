import { Field, Form, Formik } from "formik";
import { CustomCheckbox, CustomInput } from "../../Components/TextInput";
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
import { CheckoutFormSchema } from "../../ValidationSchemas/CheckoutFormSchema";

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

  const { t } = useTranslation();

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

      actions.resetForm({
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
      });

      const checkoutRef = doc(
        database,
        userId + "/checkout/" + "products/" + checkoutId
      );
      await deleteDoc(checkoutRef);
      alert("delete success");
    } catch (error) {
      console.error("Error deleting", error.message);
      alert("error deleting", error.message);
      throw error;
    }
  };

  const initialValues = () => {
    return {
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
    };
  };

  return (
    <div className="container mx-auto mt-4 lg:px-4">
      <Formik
        initialValues={initialValues()}
        onSubmit={checkFormSubmitHandler}
        validationSchema={CheckoutFormSchema(t)}
      >
        {({
          values,
          handleChange,
          handleBlur,
          isSubmitting,
          errors,
          touched,
        }) => (
          <Form>
            <div className="flex gap-x-5 justify-around">
              {/* User Shipping Information */}
              <div>
                <h1 className="mb-2 text-lg  font-medium">
                  {t("checkoutForm.contactInfo")}
                </h1>
                <div className="flex justify-start">
                  <CustomInput
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={t("checkoutForm.email")}
                    placeholder={t("checkoutForm.email")}
                    autoComplete="false"
                    errors={errors}
                    touched={touched}
                  />
                </div>

                <Divider
                  style={{ marginTop: "0.7rem", marginBottom: "0.7rem" }}
                />

                <h1 className="mb-2 text-lg  font-medium">
                  {t("checkoutForm.shippingInfo")}
                </h1>
                <div className="flex justify-between items-center">
                  <CustomInput
                    errors={errors}
                    touched={touched}
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

                  <CustomInput
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={t("checkoutForm.lastName")}
                    placeholder={t("checkoutForm.lastName")}
                    autoComplete="true"
                    errors={errors}
                    touched={touched}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <CustomInput
                    label={
                      otherAddress
                        ? t("checkoutForm.address")
                        : t("checkoutForm.selectAddress")
                    }
                    value={values.address}
                    placeholder={otherAddress && t("checkoutForm.address")}
                    name="address"
                    type="text"
                    id="address"
                    errors={errors}
                    touched={touched}
                    autoComplete="false"
                    onChange={
                      otherAddress
                        ? handleChange
                        : (e) => {
                            if (e.target.value === "otherAddress") {
                              setOtherAddress(true);
                            } else {
                              setOtherAddress(false);
                              handleChange(e);
                            }
                          }
                    }
                    onBlur={handleBlur}
                    as={!otherAddress && "select"}
                  >
                    {!otherAddress && (
                      <>
                        <option value="address">
                          {t("checkoutForm.selectAddress")}
                        </option>
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
                      </>
                    )}
                  </CustomInput>

                  <CustomInput
                    onChange={
                      otherApt
                        ? handleChange
                        : (e) => {
                            if (e.target.value === "otherApt") {
                              setOtherApt(true);
                            } else {
                              setOtherAddress(false);
                              handleChange(e);
                            }
                          }
                    }
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    name="aptSuite"
                    id="aptSuite"
                    autoComplete="false"
                    label={
                      otherApt
                        ? t("checkoutForm.apartment")
                        : t("checkoutForm.selectApart")
                    }
                    value={values.aptSuite}
                    type="text"
                    as={!otherApt && "select"}
                    placeholder={otherApt && t("checkoutForm.apartment")}
                  >
                    {!otherApt && (
                      <>
                        <option value="apt">
                          {t("checkoutForm.selectApart")}
                        </option>
                        {deliveryAddresses.map((address) => {
                          const { id, apt } = address;
                          return (
                            <option key={id} value={apt}>
                              {apt}
                            </option>
                          );
                        })}
                        <option value="otherApt">
                          {t("checkoutForm.other")}
                        </option>
                      </>
                    )}
                  </CustomInput>
                </div>

                <div className="flex justify-between gap-x-4 items-center">
                  <CustomInput
                    onBlur={handleBlur}
                    id="city"
                    type="text"
                    name="city"
                    errors={errors}
                    touched={touched}
                    value={values.city}
                    autoComplete="false"
                    label={
                      otherCity
                        ? t("delivery.city")
                        : t("checkoutForm.selectCity")
                    }
                    placeholder={otherCity && t("delivery.city")}
                    onChange={
                      otherCity
                        ? handleChange
                        : (e) => {
                            if (e.target.value === "otherCity") {
                              setOtherCity(true);
                            } else {
                              setOtherCity(false);
                              handleChange(e);
                            }
                          }
                    }
                    as={!otherCity && "select"}
                  >
                    {!otherCity && (
                      <>
                        <option value="city">
                          {t("checkoutForm.selectCity")}
                        </option>
                        {deliveryAddresses.map((address) => {
                          const { id, city } = address;
                          return (
                            <option key={id} value={city}>
                              {city}
                            </option>
                          );
                        })}
                        <option value="otherCity">
                          {t("checkoutForm.other")}
                        </option>
                      </>
                    )}
                  </CustomInput>

                  <CustomInput
                    id="state"
                    name="state"
                    value={values.state}
                    onBlur={handleBlur}
                    type="text"
                    onChange={
                      otherState
                        ? handleChange
                        : (e) => {
                            if (e.target.value === "otherState") {
                              setOtherState(true);
                            } else {
                              setOtherState(false);
                              handleChange(e);
                            }
                          }
                    }
                    label={
                      otherState
                        ? t("checkoutForm.state")
                        : t("checkoutForm.selectState")
                    }
                    placeholder={otherState && t("checkoutForm.state")}
                    errors={errors}
                    touched={touched}
                    autoComplete="false"
                    as={!otherState && "select"}
                  >
                    {!otherState && (
                      <>
                        <option value="state">
                          {t("checkoutForm.selectState")}
                        </option>
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
                      </>
                    )}
                  </CustomInput>
                </div>

                <div className="flex justify-between items-center">
                  <CustomInput
                    errors={errors}
                    touched={touched}
                    id="tel"
                    name="tel"
                    type="tel"
                    value={values.tel}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="false"
                    label={t("checkoutForm.phone")}
                    placeholder={t("checkoutForm.phone")}
                  />
                  <CustomInput
                    errors={errors}
                    touched={touched}
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    value={values.postalCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="false"
                    label={t("checkoutForm.postalCode")}
                    placeholder={t("checkoutForm.postalCode")}
                  />
                </div>

                <Divider
                  style={{ marginTop: "0.7rem", marginBottom: "0.7rem" }}
                />

                {/* Delivery Methods. */}
                <h1 className="mb-2 text-lg  font-medium">
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
                        <CustomInput
                          type="checkbox"
                          name="standard"
                          errors={errors}
                          touched={touched}
                          id="standard"
                          value={values.standard}
                          checked={markChecked.standard}
                          onChange={handleDeliveryValues}
                          onBlur={handleBlur}
                          label=""
                          className="form-radio"
                        />
                      </div>
                    </div>
                    <p>{STANDARD}</p>
                  </div>

                  <div className="border-2 border-black rounded p-4">
                    <h1 className="text-center flex justify-center">
                      {t("checkoutForm.express")}
                    </h1>
                    <div className="flex justify-around gap-x-10 items-center">
                      <div>
                        <p>2-5 {t("checkoutForm.businessDays")}</p>
                      </div>
                      <div>
                        <CustomInput
                          type="checkbox"
                          errors={errors}
                          touched={touched}
                          name="express"
                          id="express"
                          value={values.express}
                          checked={markChecked.express}
                          onChange={handleDeliveryValues}
                          onBlur={handleBlur}
                          label=""
                          className="form-radio"
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
                <h1 className="mb-2 text-lg  font-medium">
                  {t("checkoutForm.payment")}
                </h1>
                <div className="flex justify-between">
                  <CustomInput
                    errors={errors}
                    touched={touched}
                    id="cardHolder"
                    name="cardHolder"
                    type="text"
                    label={t("checkoutForm.nameOnCard")}
                    placeholder={t("checkoutForm.nameOnCard")}
                    value={values.cardHolder}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="false"
                  />

                  <CustomInput
                    id="cardNumber"
                    name="cardNumber"
                    value={values.cardNumber}
                    onBlur={handleBlur}
                    type="number"
                    onChange={
                      otherCardNumber
                        ? handleChange
                        : (e) => {
                            if (e.target.value === "otherCardNumber") {
                              setOtherCardNumber(true);
                            } else {
                              setOtherCardNumber(false);
                              handleChange(e);
                            }
                          }
                    }
                    label={
                      otherCardNumber
                        ? t("checkoutForm.cardNumber")
                        : t("checkoutForm.selectCard")
                    }
                    placeholder={
                      otherCardNumber && t("checkoutForm.cardNumber")
                    }
                    errors={errors}
                    touched={touched}
                    autoComplete="false"
                    as={!otherCardNumber && "select"}
                  >
                    {!otherCardNumber && (
                      <>
                        <option value="cardNumber">
                          {t("checkoutForm.selectCard")}
                        </option>
                        {paymentMethods.map((deliveryState) => {
                          const { id, cardNumber, accountNumber } =
                            deliveryState;
                          return (
                            <option key={id} value={cardNumber}>
                              {cardNumber}
                              {accountNumber}
                            </option>
                          );
                        })}
                        <option value="otherCardNumber">
                          {t("checkoutForm.other")}
                        </option>
                      </>
                    )}
                  </CustomInput>
                </div>
              </div>

              {/* Product Summary Section. */}
              <div>
                <h1 className="mb-2 text-lg  font-medium">
                  {t("checkoutForm.orderSummary")}
                </h1>

                {checkoutData.map((item) => {
                  const { totalAmount, totalProducts, product, id } = item;
                  return (
                    <div key={id}>
                      <div>
                        {!product ? (
                          <div className="mt-8">
                            <p className="mb-10 text-xl ">
                              {t("checkoutForm.noProducts")}
                            </p>
                            <Link
                              to="/home"
                              className="bg-black text-center text-white py-6 px-14 rounded font-medium text-xl "
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
                            <p className="mb-2 text-lg  font-medium">
                              {t("checkoutForm.totalProducts")} :
                            </p>
                            <p className="text-gray-900 text-lg  font-medium">
                              {totalProducts}
                            </p>
                          </div>
                          <div className="flex mt-2 justify-between items-center">
                            <p className="mb-2 text-lg  font-medium">
                              {t("checkoutForm.subtotal")} :
                            </p>
                            <p className="text-gray-900 text-lg  font-medium">
                              {MONEY_FORMATTER(parseInt(totalAmount), CURRENCY)}
                            </p>
                          </div>
                          <div className="flex mt-2 justify-between items-center">
                            <p className="mb-2 text-lg  font-medium">
                              {t("checkoutForm.taxes")}{" "}
                            </p>
                            <p className="text-gray-900 text-lg  font-medium">
                              {taxIsLoading ? (
                                <Loader animation={loading} size={20} />
                              ) : (
                                MONEY_FORMATTER(parseInt(taxes), CURRENCY)
                              )}
                            </p>
                          </div>
                          <div className="flex mt-2 justify-between items-center">
                            <p className="mb-2 text-lg  font-medium">
                              {t("checkoutForm.shipping")} :
                            </p>
                            <p className="text-gray-900 text-lg  font-medium">
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
                            <p className="mb-2 text-lg  font-medium">
                              {t("checkoutForm.total")} :
                            </p>
                            <p className="text-gray-900  font-medium">
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
                              className="text-white text-center bg-gray-900 font-medium px-4 py-2 rounded-md"
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
