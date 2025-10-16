const CategoryView = () => {
  return (
    <div className="container mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-800">
          View Our Range Of Categories
        </h2>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 items-stretch">
        <div className="relative bg-gray-300 rounded-2xl h-[420px] flex items-end p-4">
          <span className="text-white font-medium text-lg">
            Bedroom Furniture
          </span>
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative bg-gray-300 rounded-2xl h-[200px] flex items-end p-4">
            <span className="text-white font-medium text-lg">
              Living Room Furniture
            </span>
          </div>
          <div className="relative bg-gray-300 rounded-2xl h-[200px] flex items-end p-4">
            <span className="text-white font-medium text-lg">
              Dining Room Furniture
            </span>
          </div>
        </div>

        <div className="relative bg-gray-300 rounded-2xl h-[420px] flex items-end p-4">
          <span className="text-white font-medium text-lg">Sofa Sets</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
