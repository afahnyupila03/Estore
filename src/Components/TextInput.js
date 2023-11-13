export default function ({ field, form, ...props }) {
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const { label, type, multiline, rows, formControl, formError, style } = props;

  const trimmedValue = value ? value.trim() : "";

  return (
    <div style={style}>
      <label>{label}</label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className={formControl}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={formControl}
        />
      )}
      {/* style error message */}
      {errors[name] && touched[name] && (
        <div className={formError}>{errors[name]}</div>
      )}
    </div>
  );
}
