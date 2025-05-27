import { getRequest, postRequest } from "./axios";
export const postBookDesk = async (bookereq) => {
  const url = "/flexdesk/bookDesk";

  try {
    const response = await postRequest(url, JSON.stringify(bookereq));

    return response.data;
  } catch (error) {
    console.error("Error booking desk:", error);
    throw error;
  }
};
export const getFilterData = async () => {
  const url = `/flexdesk/getFilterData`;
  const response = await getRequest(url);
  return response;
};
export const getSearchData = async (url) => {
  // const url = `/flexdesk/searchUserBookings`;
  const response = await getRequest(url);
  return response;
};
export const getDesks = async (url) => {
  // const url = `/flexdesk/searchUserBookings`;
  const response = await getRequest(url);
  return response;
};
export const getSearchResult = async (url) => {
  // const url = `/flexdesk/searchUserBookings`;
  const response = await getRequest(url);
  return response;
};
