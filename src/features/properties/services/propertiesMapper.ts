import { Property, ServerProperty } from "features/properties";
import { amenitiesMapper } from "features/properties/amenities";
import { usersMapper } from "features/users";
import { propertyServicesMapper } from "features/properties/property-services";

// export interface PropertiesMapper {
//   toServerProperty: (property: Partial<Property>) => Partial<ServerProperty>;
//   toProperty: (serverProperty: Partial<ServerProperty>) => Partial<Property>;
// }

// export const propertiesMapper: PropertiesMapper = {
//   toServerProperty: (property) => {
//     const serverAmenities =
//       property.amenities &&
//       property?.amenities.map(amenitiesMapper.toServerAmenity);
//     const serverPropertyServices =
//       property.services &&
//       property.services.map(propertyServicesMapper.toServerPropertyService);
//     const serverOwner =
//       property.owner && usersMapper.toServerUser(property.owner);
//     return {
//       _id: property.id,
//       category: property.category,
//       payment_type: property.paymentType,
//       type: property.type,
//       class: property.class,
//       contract: property.contract,
//       locations: property.locations,
//       price: property.price,
//       insurance: property.insurance,
//       image: property.image,
//       code: property.code,
//       auto_no: property.autoNo,
//       title: property.title,
//       area: property.area,
//       bathrooms: property.bathrooms,
//       bedrooms: property.bedrooms,
//       is_finished: property.isFinished,
//       available_date:
//         property.availableDate && property.availableDate.toISOString(),
//       has_render: property.hasRender,
//       has_beach: property.hasBeach,
//       has_pool: property.hasPool,
//       has_garden: property.hasGarden,
//       owner_phone: property.ownerPhone,
//       is_monthly: property.isMonthly,
//       monthly_price: property.monthlyPrice,
//       replace_with: property.category,
//       saved: property.saved,
//       views: property.views,
//       search_feature: property.searchFeature,
//       home_search: property.homeSearch,
//       is_active: property.isActive,
//       interior_design: property.interiorDesign,
//       owner: serverOwner,
//       amenities: serverAmenities,
//       services: serverPropertyServices,
//     };
//   },
//   toProperty: (serverProperty) => {
//     const amenities =
//       serverProperty.amenities &&
//       serverProperty.amenities.map(amenitiesMapper.toAmenity);
//     const propertyServices =
//       serverProperty.services &&
//       serverProperty.services.map(propertyServicesMapper.toPropertyService);
//     const owner =
//       serverProperty.owner && usersMapper.toUser(serverProperty.owner);
//     return {
//       id: serverProperty._id,
//       category: serverProperty.category,
//       paymentType: serverProperty.payment_type,
//       type: serverProperty.type,
//       class: serverProperty.class,
//       contract: serverProperty.contract,
//       locations: serverProperty.locations,
//       price: serverProperty.price,
//       insurance: serverProperty.insurance,
//       image: serverProperty.image,
//       code: serverProperty.code,
//       autoNo: serverProperty.auto_no,
//       title: serverProperty.title,
//       area: serverProperty.area,
//       bathrooms: serverProperty.bathrooms,
//       bedrooms: serverProperty.bedrooms,
//       isFinished: serverProperty.is_finished,
//       availableDate: serverProperty.available_date
//         ? new Date(serverProperty.available_date)
//         : undefined,
//       hasRender: serverProperty.has_render,
//       hasBeach: serverProperty.has_beach,
//       hasPool: serverProperty.has_pool,
//       hasGarden: serverProperty.has_garden,
//       ownerPhone: serverProperty.owner_phone,
//       isMonthly: serverProperty.is_monthly,
//       monthlyPrice: serverProperty.monthly_price,
//       replaceWith: serverProperty.category,
//       saved: serverProperty.saved,
//       views: serverProperty.views,
//       searchFeature: serverProperty.search_feature,
//       homeSearch: serverProperty.home_search,
//       isActive: serverProperty.is_active,
//       interiorDesign: serverProperty.interior_design,
//       owner,
//       amenities,
//       services: propertyServices,
//     };
//   },
// };
