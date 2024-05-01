import { Amenity, ServerAmenity } from "features/properties/amenities";

export interface AmenitiesMapper {
  toServerAmenity: (amenity: Amenity) => ServerAmenity;
  toAmenity: (serverAmenity: ServerAmenity) => Amenity;
}

export const amenitiesMapper: AmenitiesMapper = {
  toServerAmenity: (amenity) => ({
    _id: amenity.id,
    name: amenity.name,
    access_type: amenity.accessType,
    user: amenity.user,
  }),
  toAmenity: (serverAmenity) => ({
    id: serverAmenity._id,
    name: serverAmenity.name,
    accessType: serverAmenity.access_type,
    user: serverAmenity.user,
  }),
};
