import { PropertySkeleton } from "features/properties";

const PropertiesSkeleton = () => {
  const array = Array(10).fill(0);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 md:mt-10 gap-4 md:gap-8">
      {array.map((_, index) => (
        <PropertySkeleton key={index} />
      ))}
    </div>
  );
};

export default PropertiesSkeleton;
