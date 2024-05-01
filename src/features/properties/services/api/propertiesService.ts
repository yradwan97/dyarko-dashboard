import { PropertiesFilter, Property } from "features/properties/types";
import { axiosInstance as axios } from "services/axiosInstance";
import {
  CreatePropertyResponse,
  CreatePropertyReturn,
  DeletePropertyResponse,
  DeletePropertyReturn,
  GetPropertiesResponse,
  GetPropertiesReturn,
  GetPropertyResponse,
  GetPropertyReturn,
  // propertiesMapper,
  propertiesUrl,
  ServerProperty,
  UpdatePropertyResponse,
  UpdatePropertyReturn,
} from "features/properties";
import { AxiosResponse } from "axios";

export const getProperties = async (
  filter: PropertiesFilter
): Promise<GetPropertiesReturn> => {
  const { data: res } = await axios.get<any>(
    propertiesUrl.GET_ALL,
    {
      params: filter,
    }
  );

  // const properties = res.data.map(propertiesMapper.toProperty) as Property[];

  return {
    properties: res.data,
    itemsCount: res.itemsCount,
    size: res.size ?? 10,
    pages: res.pages,
    message: res.message,
  };
};

export const getProperty = async (
  propertyId: string
): Promise<GetPropertyReturn> => {
  const { data: res } = await axios.get<any>(
    propertiesUrl.GET_BY_ID(propertyId)
  );

  // const property = propertiesMapper.toProperty(res.data) as Property;

  return {
    property: res.data,
  };
};

// export const createProperty = async (
//   property: Property
// ): Promise<CreatePropertyReturn> => {
//   const serverProperty = propertiesMapper.toServerProperty(
//     property
//   ) as ServerProperty;

//   const { data: res } = await axios.post<
//     CreatePropertyResponse,
//     AxiosResponse<CreatePropertyResponse>,
//     ServerProperty
//   >(propertiesUrl.CREATE, serverProperty);

//   const returnedProperty = propertiesMapper.toProperty(res.data) as Property;

//   return {
//     property: returnedProperty,
//   };
// };

// export const updateProperty = async (
//   propertyId: string,
//   property: Partial<Property>
// ): Promise<UpdatePropertyReturn> => {
//   const serverProperty = propertiesMapper.toServerProperty(property);

//   const { data: res } = await axios.put<
//     UpdatePropertyResponse,
//     AxiosResponse<UpdatePropertyResponse>,
//     Partial<ServerProperty>
//   >(propertiesUrl.CREATE, serverProperty);

//   const returnedProperty = propertiesMapper.toProperty(res.data) as Property;

//   return {
//     property: returnedProperty,
//   };
// };

export const deleteProperty = async (
  propertyId: string
): Promise<DeletePropertyReturn> => {
  const { data: res } = await axios.delete<any>(
    propertiesUrl.DELETE_BY_ID(propertyId)
  );

  // const property = propertiesMapper.toProperty(res.data) as Property;

  return {
    property: res.data,
  };
};
