const FormRow = ({ name, type, value, onChange, labelText }) => {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelText || name}
      </label>
      <input
        id={name}
        className="form-input"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormRow;
