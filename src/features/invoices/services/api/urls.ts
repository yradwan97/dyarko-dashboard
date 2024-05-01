interface InvoicesUrl {
  GET_ALL: string;
  GET_CHART_DATA: string;
}

const BASE_URL = `/invoices`;

export const invoicesUrls: InvoicesUrl = {
  GET_ALL: BASE_URL,
  GET_CHART_DATA: `${BASE_URL}/reports`,
};
