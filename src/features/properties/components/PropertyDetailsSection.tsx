import {
  getLastLocation,
  Property,
  PropertyImage,
} from "features/properties/index";
import { Optional } from "types";
import { Typography } from "components/shared/UI";
import { EditButton, PromoteButton } from "components/shared/UI/buttons";

interface PropertyDetailsSectionProps {
  property: Optional<Property>;
}

const PropertyDetailsSection = ({ property }: PropertyDetailsSectionProps) => {
  const lastLocation = getLastLocation(property?.locations);
  return (
    <section className="flex flex-col space-y-5">
      <PropertyImage
        imageSrc={property?.image}
        propertyTitle={property?.title}
      />
      <div className="px-8 py-3">
        <section className="flex gap-x-3">
          <div className="flex flex-col space-y-3 grow">
            <Typography variant="h3" as="h1" className="capitalize">
              {property?.title}
            </Typography>
            <Typography
              variant="body-md-medium-tall"
              as="h3"
              className="capitalize text-gray-400"
            >
              {lastLocation}
            </Typography>
          </div>
          <div className="flex gap-x-3 items-center">
            <EditButton />
            <PromoteButton propertyId={property?._id}/>
          </div>
        </section>
      </div>
    </section>
  );
};

export default PropertyDetailsSection;
