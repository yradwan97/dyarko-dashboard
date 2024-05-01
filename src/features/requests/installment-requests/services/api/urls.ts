interface InstallmentRequestsUrls {
  GET_ALL: string;
  CHANGE_STATUS: (tourId: string) => string;
}

const BASE_URL = "/installments";
export const installmentRequestsUrls: InstallmentRequestsUrls = {
  GET_ALL: BASE_URL,
  CHANGE_STATUS: (tourId) => `${BASE_URL}/status/${tourId}`,
};
