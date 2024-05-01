import {
  PaymentType,
  Property,
  PropertyCategory,
  PropertyClass,
} from "features/properties";
import { ServerUser } from "features/users";
import { APIResponse, Nullable } from "types";
import { ServerAmenity } from "features/properties/amenities";
import { ServerPropertyService } from "features/properties/property-services";

export interface GetPropertiesResponse extends APIResponse<ServerProperty> {}

export interface GetPropertiesReturn
  extends Omit<GetPropertiesResponse, "data"> {
  properties: Property[];
}

export interface PropertyReturn {
  property: Property;
}

export interface PropertyResponse {
  data: ServerProperty;
}

export interface GetPropertyResponse extends PropertyResponse {}

export interface GetPropertyReturn extends PropertyReturn {}

export interface CreatePropertyResponse extends PropertyResponse {}

export interface CreatePropertyReturn extends PropertyReturn {}

export interface UpdatePropertyResponse extends PropertyResponse {}

export interface UpdatePropertyReturn extends PropertyReturn {}

export interface DeletePropertyResponse extends PropertyResponse {}

export interface DeletePropertyReturn extends PropertyReturn {}

export interface ServerProperty {
  _id: string;
  category: PropertyCategory;
  payment_type: PaymentType;
  type: PropertyCategory;
  class: PropertyClass;
  contract: Nullable<string>;
  locations: string[];
  price: number;
  insurance: number;
  image: Nullable<string>;
  code: string;
  auto_no: string;
  title: string;
  area: number;
  bathrooms: number;
  bedrooms: number;
  is_finished: boolean;
  available_date: string;
  has_render: boolean;
  has_beach: boolean;
  has_pool: boolean;
  has_garden: boolean;
  owner_phone: string;
  is_monthly: boolean;
  monthly_price: number;
  replace_with: PropertyCategory;
  saved: number;
  views: number;
  search_feature: Nullable<string>;
  home_search: Nullable<string>;
  is_active: boolean;
  interior_design: Nullable<string>;
  owner: ServerUser;
  amenities: ServerAmenity[];
  services: ServerPropertyService[];
}

export interface PropertyService {
  _id: string,
  name: string,
  price: string,
  createdAt: string,
  updatedAt: string
}

export interface GetPropertyServicesReturn {
  data: {
    data: PropertyService[]
    pages: number
    itemsCount: number
  }
}

export interface PropertyAmenity {
  _id: string,
  user: {
      _id: string,
      name: string,
      point_balance: number,
      image: string | null
  },
  name: string,
  access_type: string,
  createdAt: string,
  updatedAt: string
}

export interface GetPropertyAmenitiesReturn {
  data: {
    data: PropertyAmenity[]
    pages: number
    itemsCount: number
  }
}