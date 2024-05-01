import { axiosInstance as axios } from "services/axiosInstance";
import { AxiosResponse } from "axios";
import { CreatePromoteResponse, CreatePromoteRequest, CreatePromoteReturn, PromoteInput } from "./types";
import { promoteUrl } from "./urls";
// import {propertiesMapper, Property} from "../../../properties";

export const createPromote = async (promoteInput: PromoteInput): Promise<any> => {
  const { data: res } = await axios.post<
    CreatePromoteResponse,
    AxiosResponse<CreatePromoteResponse>,
    CreatePromoteRequest
  >(promoteUrl.CREATE(promoteInput.featureType), { property: promoteInput.propertyId });
  // const returnedProperty = propertiesMapper.toProperty(res.data) as Property
  return {
    // property: returnedProperty,
    property: res.data
  };

};
