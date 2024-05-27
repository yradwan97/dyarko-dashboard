import { Nullable, Optional } from "types";
import clsx from "classnames";
import { Typography } from "components/shared/UI";

interface PropertyImageProps {
  imageSrc: Nullable<string> | undefined;
  propertyTitle: Optional<string>;
  isTerminated?: boolean;
}

const PropertyImage = ({
  imageSrc,
  propertyTitle,
  isTerminated,
}: PropertyImageProps) => {
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
      >
        {isTerminated && (
          <div className="absolute bg-black text-white z-999 top-1 left-1">
            <Typography className="capitalize" variant="body-xs-medium" as="p">
              Terminated
            </Typography>
          </div>
        )}
      </div>
    );

  return (  
    <div className="relative h-56">
      <img
        src={imageSrc}
        alt={propertyTitle}
        className="w-full h-full rounded-t-lg object-cover"
      />
      {isTerminated && (
        <div className="absolute bg-white text-black text-[.85rem] p-1 rounded-lg top-1 left-1">
          <Typography className="capitalize" variant="body-xs-medium" as="p">
            Terminated
          </Typography>
        </div>
      )}
    </div>
  );
};

export default PropertyImage;
