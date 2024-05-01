import { USER_TYPES } from "features/users";

export interface Plan {
  id: string;
  propertiesNumber: number;
  videos: number;
  searchFeatureProperties24: number;
  searchFeatureProperties48: number;
  homeFeatureProperties24: number;
  homeFeatureProperties48: number;
}

export interface UserPlan extends Plan {
  expirationDate: Date;
}

export interface BuyablePlan extends Plan {
  name: string;
  logo: string;
  userType: USER_TYPES;
  amount: number;
  searchFeatureLimit: number;
  featuredPropertyLimit: number;
  sale: number;
  timeLimit: number;
}
