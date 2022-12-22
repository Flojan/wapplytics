const Checkbox = (props) => {
  return (
    <div className="mb-6">
      <input
        value={props.value}
        onChange={props.onChange}
        checked={props.checked}
        id={props.type}
        name={props.type}
        type={props.type}
        required={props.required}
        className={`${props.className}`}
      />
      <label className="pl-2">{props.label}</label>
    </div>
  );
};

export default Checkbox;
