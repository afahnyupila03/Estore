import Icon from "react-icons-kit";

export default (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    numberOfLines,
    multiline,
    iconName,
    type,
    label,
    style,
    size,
    color,
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  const trimmedValue = value ? value.trim() : "";

  return (
    <div style={style}>
      {label && <label>{label}</label>}
      <div>
        <input
          // placeholdeTextColor={setColor}
          multiline={multiline}
          numberOfLines={numberOfLines}
          type={type}
          value={type === "email" ? trimmedValue : value}
          onChange={(event) => onChange(name)(event)}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          {...inputProps}
        />
        {iconName && (
          <Icon
            style={{ padding: "4%", paddingTop: "8%", position: "absolute" }}
            name={iconName}
            size={size}
            color={color}
          />
        )}
      </div>
      {/* style error message */}
      {hasError && <p>{errors[name]}</p>}
    </div>
  );
};
