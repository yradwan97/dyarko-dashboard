import { APIResponse } from "types";

export interface TermsCondition {
  _id: string;
  type: string;
  file?: string | null;
  createdAt: string;
  updatedAt: string;
  content?: string;
}

export interface PrivacyPolicy {
  _id: string;
  type: string;
  file?: string | null;
  createdAt: string;
  updatedAt: string;
  content?: string;
}

export interface RefundPolicy {
  _id: string;
  type: string;
  file?: string | null;
  createdAt: string;
  updatedAt: string;
  content?: string;
}

export interface GetTermsConditionsReturn
  extends Omit<GetTermsConditionsResponse, "data"> {
  terms: TermsCondition[];
}

export interface GetRefundPolicyReturn extends Omit<GetRefundResponse, "data"> {
  policies: RefundPolicy[];
}

export interface GetPrivacyPolicyReturn extends Omit<GetPrivacyResponse, "data"> {
  policies: PrivacyPolicy[];
}

export interface GetTermsConditionsResponse extends APIResponse<TermsCondition> {}
export interface GetPrivacyResponse extends APIResponse<PrivacyPolicy> {}
export interface GetRefundResponse extends APIResponse<RefundPolicy> {}