import { Nullable, Optional } from "types";
import clsx from "classnames";

interface PropertyImageProps {
  imageSrc: Nullable<string> | undefined;
  propertyTitle: Optional<string>;
}

const PropertyImage = ({ imageSrc, propertyTitle }: PropertyImageProps) => {
  if (!imageSrc)
    return (
      <div
        className={clsx(
          "relative",
          "bg-[url('/src/assets/images/property.png')]",
          "bg-cover",
          "bg-center",
          "h-56",
          "rounded-t-lg"
        )}
      ></div>
    );

  return (
    <div className="relative h-56">
      <img
        src={imageSrc}
        alt={propertyTitle}
        className="w-full h-full rounded-t-lg object-cover"
      />
    </div>
  );
};

export default PropertyImage;
