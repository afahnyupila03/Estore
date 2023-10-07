import Icon from "react-icons-kit";

const CustomTextInput = (props) => {
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
      <div
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <input
          style={{ flex: 1, borderColor: hasError && "red" }}
          // placeholdeTextColor={setColor}
          multiline={multiline}
          numberOfLines={numberOfLines}
          type={type}
          value={type === "email" ? trimmedValue : value}
          onChange={(event) => onChange(event)}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          {...inputProps}
        />
        {iconName && (
          <Icon
          style={style}
            icon={iconName}
            size={size}
            color={color}
          />
        )}
      </div>
      {/* style error message */}
      {hasError && <p style={{ fontSize: 10, color: "red" }}>{errors[name]}</p>}
    </div>
  );
};

export default CustomTextInput;
