import Icon from "react-icons-kit";
import styled from "styled-components";

const getStyles = () => ({
  textFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  inputStyle: {
    flex: 1,
  },
  errorText: {
    fontSize: 20,
    color: "red",
  },
  errorInput: {
    borderColor: "red",
  },
});

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

  const styles = getStyles();

  const hasError = errors[name] && touched[name];

  const trimmedValue = value ? value.trim() : "";

  return (
    <div style={style}>
      {label && <label>{label}</label>}
      <div style={styles.textFieldContainer}>
        {/* <Field 
                    type={type}
                /> */}
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
          style={[
            { ...styles.inputStyle, paddingLeft: iconName ? "5%" : "10%" },
            multiline && { height: numberOfLines * 40 },
            hasError && styles.errorInput,
          ]}
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
      {hasError && <p style={styles.errorText}>{errors[name]}</p>}
    </div>
  );
};
