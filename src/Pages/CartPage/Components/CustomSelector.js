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
        label="Apt, Suite, etc"
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
        <option value="apt">Select apt</option>
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