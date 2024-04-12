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

export default function CheckOutForm() {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [other, setOther] = useState(false);
  const [otherState, setOtherState] = useState(false);
  const [otherCardNumber, setOtherCardNumber] = useState(false);
  const [otherAddress, setOtherAddress] = useState(false);
  const [otherApt, setOtherApt] = useState(false);
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
  const { removeProductHandler, productQuantity, clearProductHandler } =
    useCart();

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

  console.log("shipping price: ", shippingPrice);

  useEffect(() => {
    if (deliveryValues.standard === true) {
      console.log("useEffect price: ", shippingPrice);
      setShippingPrice(STANDARD);
    } else if (deliveryValues.express === true) {
      console.log("useEffect price: ", shippingPrice);
      setShippingPrice(EXPRESS);
    } else {
      setShippingPrice(0);
    }
  }, [deliveryValues.standard, deliveryValues.express]);

  const VAT = productTotalPrice ? 0.1925 : 0;
  const INCOME_TAX = productTotalPrice ? 0.3333 : 0;
  const STAMP_DUTY = productTotalPrice ? 2000 : 0;

  const handleTaxesCalc = (productPrice, vat, incomeTax, stampDuty) => {
    setTaxIsLoading(true);

    const calculateTaxes = productPrice * (vat * incomeTax) + stampDuty;

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
      handleTaxesCalc(productTotalPrice, VAT, INCOME_TAX, STAMP_DUTY);
    }
  }, [checkoutData, VAT, INCOME_TAX, STAMP_DUTY]);

  useEffect(() => {
    if (SHIPPING_COST() && checkoutData) {
      handleCheckoutTotal(productTotalPrice, SHIPPING_COST(), taxes);
    }
  }, [SHIPPING_COST(), checkoutData, taxes]);

  const checkFormSubmitHandler = (values, actions) => {
    setTimeout(() => {
      console.log("form values: ", values);
      const productData = checkoutData.map((productInfo) => {
        const { product } = productInfo;
        const checkoutProduct = product.map(
          ({ description, stock, images, rating, ...rest }) => rest
        );
        return checkoutProduct;
      });
      console.log("ProductData: ", productData);
      clearProductHandler();
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
    }, 1000);
  };

  return (
    <div className="container mx-auto mt-4 lg:px-4">
      <Formik
        initialValues={{
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
                  Contact Information
                </h1>
                <Field
                  component={CustomTextInput}
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Email"
                  placeholder="Email"
                  autoComplete="false"
                />

                <Divider
                  style={{ marginTop: "0.7rem", marginBottom: "0.7rem" }}
                />

                <h1 className="mb-2 text-lg font-mono font-semibold">
                  Shipping Information
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
                    label="First name"
                    placeholder="First name"
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
                    label="Last name"
                    placeholder="Last name"
                    autoComplete="true"
                  />
                </div>

                <div className="flex justify-between items-center">
                  {otherAddress ? (
                    <Field
                      component={CustomTextInput}
                      id="address"
                      name="address"
                      type="text"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="true"
                      label="Address"
                    />
                  ) : (
                    <div className="grid">
                      <label
                        htmlFor="address"
                        className="font-semibold font-mono"
                      >
                        Address
                      </label>
                      <Field
                        component="select"
                        name="address"
                        placeholder="Select address"
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
                        <option value="address">Select address</option>
                        {deliveryAddresses.map((deliveryInfor) => (
                          <option
                            key={deliveryInfor.id}
                            value={deliveryInfor.address}
                          >
                            {deliveryInfor.address}
                          </option>
                        ))}
                        <option value="otherAddress">Other, SPecify...</option>
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
                      label="Apartment, Suite, etc"
                    />
                  ) : (
                    <div className="grid">
                      <label htmlFor="apt" className="font-semibold font-mono">
                        Apartment, Suite, etc
                      </label>
                      <Field
                        component="select"
                        name="apt"
                        placeholder="Select Apt"
                        label="Apt, Suite, etc" // Added label prop
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
                        <option value="city">Select apt</option>
                        {deliveryAddresses.map((deliveryInfor) => (
                          <option
                            key={deliveryInfor.id}
                            value={deliveryInfor.apt}
                          >
                            {deliveryInfor.apt}
                          </option>
                        ))}
                        <option value="otherApt">Other, SPecify...</option>
                      </Field>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  {other ? (
                    <Field
                      component={CustomTextInput}
                      id="city"
                      name="city"
                      type="text"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="true"
                      label="City"
                    />
                  ) : (
                    <div className="grid">
                      <label htmlFor="city" className="font-semibold font-mono">
                        City
                      </label>
                      <Field
                        component="select"
                        name="city"
                        placeholder="select"
                        label="City" // Added label prop
                        onChange={(e) => {
                          if (e.target.value === "other") {
                            setOther(true);
                          } else {
                            setOther(false);
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
                        <option value="city">Select city</option>
                        {deliveryAddresses.map((deliveryInfor) => (
                          <option
                            key={deliveryInfor.id}
                            value={deliveryInfor.address}
                          >
                            {deliveryInfor.address}
                          </option>
                        ))}
                        <option value="other">Other, SPecify...</option>
                      </Field>
                    </div>
                  )}
                  {otherState ? (
                    <Field
                      component={CustomTextInput}
                      id="state"
                      name="state"
                      type="text"
                      value={values.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="true"
                      label="State / Province"
                    />
                  ) : (
                    <div className="grid">
                      <label
                        htmlFor="state"
                        className="font-semibold font-mono"
                      >
                        State / Province
                      </label>
                      <Field
                        component="select"
                        name="state"
                        placeholder="state"
                        label="state / Province" // Added label prop
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
                        <option value="otherState">Select state</option>
                        {deliveryAddresses.map((deliveryInfor) => (
                          <option
                            key={deliveryInfor.id}
                            value={deliveryInfor.state}
                          >
                            {deliveryInfor.state}
                          </option>
                        ))}
                        <option value="otherState">
                          Other state, SPecify...
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
                    label="Phone"
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
                    label="Postal code"
                  />
                </div>

                <Divider
                  style={{ marginTop: "0.7rem", marginBottom: "0.7rem" }}
                />

                {/* Delivery Methods. */}
                <h1 className="mb-2 text-lg font-mono font-semibold">
                  Delivery Method
                </h1>
                <div
                  role="group"
                  aria-labelledby="my-radio-group"
                  className="flex justify-around items-center"
                >
                  <div className="border-2 border-black rounded p-4">
                    <h1 className="text-center flex justify-center">
                      Standard
                    </h1>
                    <div className="flex justify-around gap-x-10 items-center">
                      <div>
                        <p>4-10 business days</p>
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
                    <h1 className="text-center flex justify-center">Express</h1>
                    <div className="flex justify-around gap-x-10 items-center">
                      <div>
                        <p>2-5 business days</p>
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
                  Payment
                </h1>
                <div className="flex justify-between reverse">
                  <Field
                    component={CustomTextInput}
                    id="cardHolder"
                    name="cardHolder"
                    type="text"
                    label="Name on card"
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
                      label="Card number"
                      value={values.cardNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      renderCardImage={true}
                      autoComplete="false"
                    />
                  ) : (
                    <div className="grid">
                      <label
                        htmlFor="cardNumber"
                        className="font-semibold font-mono"
                      >
                        Card number
                      </label>
                      <Field
                        component="select"
                        name="cardNumber"
                        placeholder="cardNumber"
                        label="Card number" // Added label prop
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
                        <option value="city">Card number</option>
                        {paymentMethods.map((paymentInfo) => (
                          <option
                            key={paymentInfo.id}
                            value={paymentInfo.cardNumber}
                          >
                            {paymentInfo.cardNumber}
                          </option>
                        ))}
                        <option value="otherCardNumber">
                          Other card number
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
                      label="Expiry date"
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
                      label="cvc"
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
                  Order summary
                </h1>

                {checkoutData.map((item) => {
                  const { totalAmount, totalProducts, product, id } = item;
                  return (
                    <div key={id}>
                      <div>
                        {!product ? (
                          <div className="mt-8">
                            <p className="mb-10 text-xl font-mono">
                              No products to checkout...!
                            </p>
                            <Link
                              to="/home"
                              className="bg-black text-center text-white py-6 px-14 rounded font-semibold text-xl font-mono"
                            >
                              Continue Shopping
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
                              Total products :
                            </p>
                            <p className="text-gray-900 text-lg font-mono font-semibold">
                              {totalProducts}
                            </p>
                          </div>
                          <div className="flex mt-2 justify-between items-center">
                            <p className="mb-2 text-lg font-mono font-semibold">
                              Subtotal :
                            </p>
                            <p className="text-gray-900 text-lg font-mono font-semibold">
                              {MONEY_FORMATTER(parseInt(totalAmount), CURRENCY)}
                            </p>
                          </div>
                          <div className="flex mt-2 justify-between items-center">
                            <p className="mb-2 text-lg font-mono font-semibold">
                              Taxes :
                            </p>
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
                              Shipping :
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
                              Total :
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
                                ? "loading invoice"
                                : "Confirm order"}
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
