interface PlansUrl {
  GET_ALL: string;
  ASSIGN_TO_USER: (planId: string) => string;
}

const BASE_URL = `/plans`;
const getUrlById = (id: string) => `${BASE_URL}/${id}`;

export const plansUrls: PlansUrl = {
  GET_ALL: BASE_URL,
  ASSIGN_TO_USER: getUrlById,
};
