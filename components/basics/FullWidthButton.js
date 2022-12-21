const FullWidthButton = (props) => {
  return (
    <button
      type="submit"
      className="group relative flex w-full justify-center rounded-md border border-white bg-black py-3 px-4 text-sm font-medium text-white hover:bg-gray focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2"
    >
      {props.value}
    </button>
  );
};

export default FullWidthButton;
