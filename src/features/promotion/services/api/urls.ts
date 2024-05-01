interface PromoteUrl {
  CREATE: (featureType: string)=> string;
}

const BASE_URL = `/features`;

export const promoteUrl: PromoteUrl = {
  CREATE: (featureType: string) => `${BASE_URL}/${featureType}`,
};
