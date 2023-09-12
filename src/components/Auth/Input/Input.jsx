import "./Input.css";

function Input({ title, onChange, name, type = "text", error, minLength, maxLength }) {
  const requiredProps = type === "text" ? { minLength: 2, maxLength: 30, required: true } : null;

  return (
    <label className="input-label text_input color_text">
      {title}
      <input
        name={name}
        type={type}
        className={`input ${error && "color_error"}`}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        {...requiredProps}
        placeholder={title}
        required
      ></input>
      <span className={`input-error ${error && "input-error_visible"} text`}>{error}</span>
    </label>
  );
}

export default Input;
