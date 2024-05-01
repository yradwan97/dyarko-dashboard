import {
  PropertyService,
  ServerPropertyService,
} from "features/properties/property-services";

export interface PropertyServicesMapper {
  toServerPropertyService: (
    propertyService: PropertyService
  ) => ServerPropertyService;
  toPropertyService: (
    serverPropertyService: ServerPropertyService
  ) => PropertyService;
}

export const propertyServicesMapper: PropertyServicesMapper = {
  toServerPropertyService: (propertyService) => ({
    _id: propertyService.id,
    name: propertyService.name,
    price: propertyService.price,
  }),
  toPropertyService: (serverPropertyService) => ({
    id: serverPropertyService._id,
    name: serverPropertyService.name,
    price: serverPropertyService.price,
  }),
};
