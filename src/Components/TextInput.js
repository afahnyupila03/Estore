export default function ({ field, form, ...props }) {
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const { label, type, placeholder } = props;

  const inputField = {
    backgroundColor: "#9ca3af",
    borderRadius: ".4rem",
    padding: ".5rem",
    textAlign: "left",
    margin: ".5rem",
    width: "20rem",
    color: "#020617",
  };
  const errorInput = {
    backgroundColor: "#9ca3af",
    borderRadius: ".4rem",
    padding: ".5rem",
    textAlign: "left",
    margin: ".5rem",
    width: "20rem",
    borderColor: "red",
    borderWidth: ".15rem",
    color: "#020617",
  };

  return (
    <div className="grid justify-center">
      <label htmlFor={name} className="font-semibold font-mono ">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        placeholder={placeholder}
        style={errors[name] && touched[name] ? errorInput : inputField}
        {...props}
      />
      {/* style error message */}
      {errors[name] && touched[name] && (
        <p style={{ color: "red" }}>{errors[name]}</p>
      )}
    </div>
  );
}

export function CustomCheckbox({ field, form, ...props }) {
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const { label, type } = props;

  return (
    <div>
      <div className="flex justify-center">
        <input
          id={name}
          name={name}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          {...props}
        />

        <span className="mx-4">{label}</span>
      </div>
      <div className="flex justify-center">
        {errors[name] && touched[name] && (
          <p style={{ color: "red" }}>{errors[name]}</p>
        )}
      </div>
    </div>
  );
}
