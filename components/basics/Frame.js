const Frame = (props) => {
  return (
    <div className="grid bg-white dark:bg-black border dark:border-mint rounded-lg shadow-md mt-6 ">
      <div className="p-5">{props.children}</div>
    </div>
  );
};

export default Frame;
