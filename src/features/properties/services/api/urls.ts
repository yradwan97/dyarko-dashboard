interface PropertiesUrl {
  GET_ALL: string;
  GET_BY_ID: (id: string) => string;
  CREATE: string;
  DELETE_BY_ID: (id: string) => string;
}

const BASE_URL = `/properties`;
const getUrlById = (id: string) => `${BASE_URL}/${id}`;

export const propertiesUrl: PropertiesUrl = {
  GET_ALL: BASE_URL,
  GET_BY_ID: getUrlById,
  CREATE: BASE_URL,
  DELETE_BY_ID: getUrlById,
};
