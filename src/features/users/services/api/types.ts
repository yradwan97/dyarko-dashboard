import { Status, USER_ROLES, USER_TYPES } from "features/users";
import { ServerUserPlan } from "features/plans";
import { Nullable } from "types";

export interface ServerUser {
  _id: string;
  civilian_id: string;
  reset_password_code: Nullable<string>;
  name: string;
  image: Nullable<string>;
  email: string;
  type: USER_TYPES;
  phone: string;
  subMerchantId: Nullable<string>;
  upload_properties: number;
  upload_videos: number;
  points: number;
  role: USER_ROLES;
  status: Status;
  is_confirmed: boolean;
  average_rating: number;
  number_of_properties: number;
  number_of_reviewers: number;
  total_balance: number;
  plan?: ServerUserPlan;
}
