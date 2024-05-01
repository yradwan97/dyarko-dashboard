import { Filter, Nullable } from "types";
import { User } from "features/users";
import { Amenity } from "features/properties/amenities";
import { PropertyService } from "./services/api/types";


export enum PropertyType {
  STAND_ALONE = "stand_alone",
  DUPLEX = "duplex",
  TWIN_HOUSE = "twin_house",
  TOWN_HOUSE = "town_house",
  HOUSE = "house",
  APARTMENT = "apartment",
  FLOOR = "floor",
  PALACE = "palace",
  UNDER_CONSTRUCTION = "under_construction",
  VILLA = "villa",
  STUDIO = "studio",
  UPPER_CHALET = "upper_chalet",
  GROUND_CHALET = "ground_chalet",
  PENTHOUSE = "penthouse",
  FIXED_CARAVAN = "fixed",
  MOVABLE_CARAVAN = "movable",
}

export enum PaymentType {
  RENT = "rent",
  CASH = "cash",
  INSTALLMENT = "installment",
  SHARE = "share",
  REPLACEMENT = "replacement",
}

export enum PaymentOption {
  PLAN = "plan",
  CASH = "cash",
}

export enum PropertyCategory {
  HOUSE = "house",
  CARAVAN = "caravan",
  CHALET = "chalet",
  FARM = "farm",
  LAND = "land",
  SINGLE_TENT = "tent_single",
  TENT_GROUP = "tent_group",
}

export enum PropertyClass {
  NONE = "none",
  MEDIUM = "medium",
  LUX = "lux",
  SUPER_LUX = "super_lux",
  ULTRA_SUPER_LUX = "ultra_super_lux",
}

export interface Property {
  _id: string;
  appear_to?: string
  category: PropertyCategory;
  payment_type: PaymentType;
  type: PropertyType;
  description: string
  class: PropertyClass;
  contract: Nullable<string>;
  locations: string[];
  price: number;
  insurance: number;
  discount: number | null
  discount_expiration_date: string | null
  image: Nullable<string>;
  images: Nullable<string>[];
  code: string;
  auto_no: string;
  title: string;
  area: number;
  bathrooms: number;
  bedrooms: number;
  is_finished: boolean;
  finish_type: string
  available_date: Date;
  createdAt: Date | string
  has_renter?: boolean;
  has_beach: boolean;
  has_pool: boolean;
  has_garden: boolean;
  owner_phone: string;
  is_daily: boolean;
  is_weekly: boolean
  is_monthly: boolean;
  daily_price: number;
  weekly_price: number;
  monthly_price: number;
  replace_with?: PropertyCategory;
  saved: number;
  views: number;
  search_feature: Nullable<string>;
  home_search: Nullable<string>;
  is_active: boolean;
  interior_design: Nullable<string>;
  owner: Owner;
  amenities: Amenity[];
  services: PropertyService[];
  tents_info?: Tent[]
  lat: number
  long: number
}

export interface PropertiesFilter extends Filter {
  payment_type: PaymentType;
  owner?: string;
}

export interface Tent {
  price: number,
  code: string,
  capacity: number,
  available_date: string,
  insurance: number,
  _id: string,
}

export interface Owner {
  _id: string,
  type: string,
  average_rating: number,
  number_of_reviewers: number,
  number_of_properties: number,
  followers: string[],
  total_balance: number,
  paid_out_balance: number,
  is_merchant_registered: false,
  wallet: number,
  name: string,
  email: string,
  civilian_id: string,
  image: string,
  phone: string,
  points: number,
  refund_policy: RefundPolicy[] | null,
}

export interface RefundPolicy {
  name: string,
  content: string,
  _id: string
}