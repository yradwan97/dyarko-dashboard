import {Property, ServerProperty} from "../../../properties";

export interface CreatePromoteResponse{
  success: boolean
  data: ServerProperty
}

export interface CreatePromoteRequest {
  property: string
}

export interface CreatePromoteReturn {
  property: Property
}

export interface PromoteInput {
  propertyId : string;
  featureType: string;
}