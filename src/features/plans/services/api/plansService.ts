import { axiosInstance as axios } from "services/axiosInstance";
import {
  GetBuyablePlansResponse,
  GetBuyablePlansReturn,
  plansMapper,
  plansUrls,
} from "features/plans";

export const getPlans = async (): Promise<GetBuyablePlansReturn> => {
  const { data: res } = await axios.get<GetBuyablePlansResponse>(
    plansUrls.GET_ALL
  );

  const plans = res.data.map(plansMapper.toBuyablePlan);

  return {
    plans,
    itemsCount: res.itemsCount,
    size: res.size,
    pages: res.pages,
    message: res.message,
  };
};