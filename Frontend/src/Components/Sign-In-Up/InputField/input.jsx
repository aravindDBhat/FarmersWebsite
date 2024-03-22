function Input(Props) {
  return (
    <div className="inputbody">
      <div className="input-data">
        <input
          id={Props.placeholder}
          name={Props.placeholder}
          type={Props.type}
          onChange={Props.func}
          required="required"
          value={Props.val}
        />
        <label htmlFor={Props.placeholder}>{Props.placeholder}</label>
      </div>
    </div>
  );
}
export default Input;
