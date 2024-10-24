const Loader = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
      {[1, 2, 3].map((el) => (
        <div
          key={el}
          className="p-4 bg-white rounded-lg shadow-md animate-pulse"
        >
          <div className="w-full h-24 mb-2 bg-gray-300 rounded"></div>
          <div className="w-full h-8 mb-2 bg-gray-300 rounded"></div>
          <div className="w-1/2 h-8 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
