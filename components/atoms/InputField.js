const InputField = (props) => {
  return (
    <input
      value={props.value}
      onChange={props.onChange}
      id={props.type}
      name={props.type}
      type={props.type}
      autoComplete={props.type}
      required
      className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-400 focus:z-10 focus:border-gray focus:outline-none focus:ring-gray sm:text-sm"
      placeholder={props.placeholder}
    />
  );
};

export default InputField;
