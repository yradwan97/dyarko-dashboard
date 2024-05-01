import { Nullable } from "types";
import { UserPlan } from "features/plans";

export enum Status {
  ACTIVE = "active",
}

export type User = {
  id: string;
  civilianId: string;
  resetPasswordCode: Nullable<string>;
  name: string;
  image: Nullable<string>;
  email: string;
  type: USER_TYPES;
  phone: string;
  subMerchantId: Nullable<string>;
  uploadProperties: number;
  uploadVideos: number;
  points: number;
  role: USER_ROLES;
  status: Status;
  isConfirmed: boolean;
  averageRating: number;
  propertiesNumber: number;
  reviewersNumber: number;
  totalBalance: number;
  plan?: UserPlan;
};

export enum USER_TYPES {
  USER = "user",
  OWNER = "owner",
}

export enum USER_ROLES {
  OWNER = "owner",
}
