import { USER_TYPES } from "features/users";
import { APIResponse } from "types";
import { BuyablePlan } from "features/plans/types";

export interface ServerPlan {
  _id: string;
  properties_number: number;
  search_feature_properties_24: number;
  search_feature_properties_48: number;
  home_feature_properties_24: number;
  home_feature_properties_48: number;
  videos: number;
}

export interface ServerUserPlan extends ServerPlan {
  expiration_date: string;
}

export interface ServerBuyablePlan extends ServerPlan {
  plan_name: string;
  logo: string;
  user_type: USER_TYPES;
  amount: number;
  search_feature_limit: number;
  featured_property_limit: number;
  sale: number;
  time_limit: number;
}

export interface GetBuyablePlansResponse
  extends APIResponse<ServerBuyablePlan> {}

export interface GetBuyablePlansReturn
  extends Omit<GetBuyablePlansResponse, "data"> {
  plans: BuyablePlan[];
}

export interface AssignPlanToUserResponse {
  data: {
    PayUrl: string;
    sessionId: string;
  };
}

export interface AssignPlanToUserReturn {
  payUrl: string;
  sessionId: string;
}
