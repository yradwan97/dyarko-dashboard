import {
  BuyablePlan,
  ServerBuyablePlan,
  ServerUserPlan,
  UserPlan,
} from "features/plans";

export interface PlansMapper {
  toServerUserPlan: (plan: UserPlan) => ServerUserPlan;
  toUserPlan: (serverPlan: ServerUserPlan) => UserPlan;
  toBuyablePlan: (serverBuyablePlan: ServerBuyablePlan) => BuyablePlan;
  toBuyableServerPlan: (server: BuyablePlan) => ServerBuyablePlan;
}

export const plansMapper: PlansMapper = {
  toServerUserPlan: (userPlan) => ({
    _id: userPlan.id,
    properties_number: userPlan.propertiesNumber,
    search_feature_properties_24: userPlan.searchFeatureProperties24,
    search_feature_properties_48: userPlan.searchFeatureProperties48,
    home_feature_properties_24: userPlan.homeFeatureProperties24,
    home_feature_properties_48: userPlan.homeFeatureProperties48,
    videos: userPlan.videos,
    expiration_date: userPlan.expirationDate.toISOString(),
  }),
  toUserPlan: (serverUserPlan) => ({
    id: serverUserPlan._id,
    propertiesNumber: serverUserPlan.properties_number,
    searchFeatureProperties24: serverUserPlan.search_feature_properties_24,
    searchFeatureProperties48: serverUserPlan.search_feature_properties_48,
    homeFeatureProperties24: serverUserPlan.home_feature_properties_24,
    homeFeatureProperties48: serverUserPlan.home_feature_properties_48,
    videos: serverUserPlan.videos,
    expirationDate: new Date(serverUserPlan.expiration_date),
  }),
  toBuyablePlan: (serverBuyablePlan) => {
    return {
      id: serverBuyablePlan._id,
      propertiesNumber: serverBuyablePlan.properties_number,
      searchFeatureProperties24: serverBuyablePlan.search_feature_properties_24,
      searchFeatureProperties48: serverBuyablePlan.search_feature_properties_48,
      homeFeatureProperties24: serverBuyablePlan.home_feature_properties_24,
      homeFeatureProperties48: serverBuyablePlan.home_feature_properties_48,
      videos: serverBuyablePlan.videos,
      name: serverBuyablePlan.plan_name,
      logo: serverBuyablePlan.logo,
      userType: serverBuyablePlan.user_type,
      amount: serverBuyablePlan.amount,
      searchFeatureLimit: serverBuyablePlan.search_feature_limit,
      featuredPropertyLimit: serverBuyablePlan.featured_property_limit,
      sale: serverBuyablePlan.sale,
      timeLimit: serverBuyablePlan.time_limit,
    };
  },
  toBuyableServerPlan: (serverBuyablePlan) => ({
    _id: serverBuyablePlan.id,
    properties_number: serverBuyablePlan.propertiesNumber,
    search_feature_properties_24: serverBuyablePlan.searchFeatureProperties24,
    search_feature_properties_48: serverBuyablePlan.searchFeatureProperties48,
    home_feature_properties_24: serverBuyablePlan.homeFeatureProperties24,
    home_feature_properties_48: serverBuyablePlan.homeFeatureProperties48,
    videos: serverBuyablePlan.videos,
    plan_name: serverBuyablePlan.name,
    logo: serverBuyablePlan.logo,
    user_type: serverBuyablePlan.userType,
    amount: serverBuyablePlan.amount,
    search_feature_limit: serverBuyablePlan.searchFeatureLimit,
    featured_property_limit: serverBuyablePlan.featuredPropertyLimit,
    sale: serverBuyablePlan.sale,
    time_limit: serverBuyablePlan.timeLimit,
  }),
};
