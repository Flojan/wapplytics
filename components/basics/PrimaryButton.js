const PrimaryButton = (props) => {
  return (
    <button
      type="submit"
      className="group mt-6 relative flex justify-center rounded-md border border-white bg-black py-3 px-4 text-sm font-medium text-white hover:bg-gray focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2"
    >
      {props.value}
    </button>
  );
};

export default PrimaryButton;
