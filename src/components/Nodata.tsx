const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <img role="presentation" className="h-60" alt="" src="/no-data.svg" />
      <div className="mt-6 text-lg text-gray-600 ">No data found!</div>
    </div>
  );
};
export default NoData;
