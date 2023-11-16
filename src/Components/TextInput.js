export default function ({ field, form, ...props }) {
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const {
    label,
    type,
    placeholder,
    multiline,
    rows,
    formControl,
    formError,
    style,
  } = props;

  const trimmedValue = value ? value.trim() : "";

  return (
    <div style={style}>
      <label>{label}</label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={trimmedValue}
          onChange={onChange}
          rows={rows}
          className={formControl}
          {...props}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          label={label}
          placeholder={placeholder}
          className={formControl}
          {...props}
        />
      )}
      {/* style error message */}
      {errors[name] && touched[name] && (
        <div className={formError}>{errors[name]}</div>
      )}
    </div>
  );
}

export function CustomCheckbox({ field, form, ...props }) {
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const { label, formError, type } = props;

  return (
    <>
      <input
        id={name}
        name={name}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        {...props}
      />
      <span>{label}</span>
      {errors[name] && touched[name] && (
        <div className={formError}>{errors[name]}</div>
      )}
    </>
  );
}
