import { Field, Form, Formik } from "formik";
import CustomTextInput, {
  CustomCheckbox,
  CustomSelect,
} from "../../Components/TextInput";
import SummaryCardItems from "./Components/SummaryCardItems";
import { useAuth, useCart } from "../../Store";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import {
  DeliveryServices,
  PaymentMethodServices,
} from "../../Services/AccountServices";

export default function CheckOutForm() {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [other, setOther] = useState(false);
  const [otherState, setOtherState] = useState(false);
  const [otherCardNumber, setOtherCardNumber] = useState(false);
  const [otherAddress, setOtherAddress] = useState(false);
  const [otherApt, setOtherApt] = useState(false);

  const { user } = useAuth();
  const userName = user?.displayName;
  const userId = user?.uid;

  const splitUserName = (displayName) => {
    if (!displayName) {
      return { first: "", last: "" };
    }
    const names = displayName.split(" ");
    const first = names[0] || "";
    const last = names.slice(1).join(" ") || "";
    return { first, last };
  };

  useEffect(() => {
    const { first, last } = splitUserName(userName);
    setUserFirstName(first);
    setUserLastName(last);
  }, [userName]);

  console.log("name: ", `${userFirstName} ${userLastName}`);

  const {
    products,
    totalAmount,
    removeProductHandler,
    productQuantity,
    clearProductHandler,
  } = useCart();

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

  const { firstName, lastName, address, state, apt, city, zip } =
    deliveryAddresses.length > 0 ? deliveryAddresses[0] : {};
  const { cardNumber } = paymentMethods.length > 0 ? paymentMethods[0] : {};

  const checkFormSubmitHandler = (values, actions) => {
    setTimeout(() => {
      console.log("form values: ", values);
      console.log(
        "ProductData: ",
        products.map(
          ({ thumbnail, description, images, rating, stock, id, ...rest }) =>
            rest
        )
      );
      console.log("Cart total amount: ", totalAmount);
      clearProductHandler();
      actions.resetForm({
        values: {
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
          standard: false,
          express: false,
          cardNumber: "",
          cardHolder: "",
          expiryDate: "",
          cvc: "",
        },
      });
    }, 1000);
  };

  return (
    <div className="container mx-auto mt-4 lg:px-4">
      <Formik
        initialValues={{
          email: "",
          firstName: userFirstName,
          lastName: userLastName,
          company: "",
          address: "",
          aptSuite: "",
          city: "",
          state: "",
          postalCode: "",
          tel: "",
          standard: false,
          express: false,
          cardNumber: "",
          cardHolder: "",
          expiryDate: "",
          cvc: "",
        }}
        onSubmit={checkFormSubmitHandler}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <div className="flex gap-x-5 justify-around">
              <div>
                <h1>Contact Information</h1>
                <Field
                  component={CustomTextInput}
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Email"
                  autoComplete="false"
                />

                <hr />

                <h1>Shipping Information</h1>
                <div className="flex justify-between items-center">
                  <div>
                    <Field
                      component={CustomTextInput}
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="First Name"
                      autoComplete="true"
                    />
                  </div>
                  <div>
                    <Field
                      component={CustomTextInput}
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Last Name"
                      autoComplete="true"
                    />
                  </div>
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
                        label="Address" // Added label prop
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

                <hr />

                <h1>Delivery Method</h1>
                <div className="flex justify-around items-center">
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
                          type="checkbox"
                          values={values.standard}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    <p>input amount</p>
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
                          type="checkbox"
                          values={values.express}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    <p>input amount</p>
                  </div>
                </div>

                <hr />

                <h1>Payment</h1>
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
                    <label htmlFor="city" className="font-semibold font-mono">
                      City
                    </label>
                    <Field
                      component="select"
                      name="cardNumber"
                      placeholder="cardNumber"
                      label="City" // Added label prop
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
                      {deliveryAddresses.map((deliveryInfor) => (
                        <option
                          key={deliveryInfor.id}
                          value={deliveryInfor.cardNumber}
                        >
                          {deliveryInfor.cardNumber}
                        </option>
                      ))}
                      <option value="otherCardNumber">Other card number</option>
                    </Field>
                  </div>
                )}
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

              <div>
                <h1>Order summary</h1>
                {products.map((summaryOrder) => (
                  <SummaryCardItems
                    summaryData={summaryOrder}
                    key={summaryOrder.id}
                    removeProductHandler={() =>
                      removeProductHandler(summaryOrder.id)
                    }
                  />
                ))}
                <hr />
                <div className="flex justify-between">
                  <p>Total amount of product</p> <p>{productQuantity}</p>
                </div>
                <div className="flex justify-between">
                  <p>Subtotal</p> <p>{totalAmount}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p> <p>shippingAmount</p>
                </div>
                <div className="flex justify-between">
                  <p>Taxes</p> <p>taxesAmount</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <p>Total</p> <p>totalAmount</p>
                </div>

                <div>
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "loading invoice" : "Confirm order"}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
