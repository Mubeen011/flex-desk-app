import { getRequest, postRequest } from "./axios.js";

export const getPlannerdata = async (strtDate, endDate, search) => {
  const url = `/flexdesk/getUsersSchedule?startDate=${strtDate}&endDate=${endDate}&loggedInUserEmail=mubeen.mohammad@mivada.com&searchText=${search}`;
  console.log(url);
  const response = await getRequest(url);
  return response;
};

export const getPeopledata = async (search) => {
  const url = `/flexdesk/getPeopleInfo?searchText=${search}&email=mubeen.mohammad@mivada.com&isTeamView=false`;
  console.log(url);
  const response = await getRequest(url);
  return response;
};
export const getMyTeam = async (search) => {
  const url = `/flexdesk/getPeopleInfo?searchText=${search}&email=mubeen.mohammad@mivada.com&isTeamView=true`;
  console.log(url);
  const response = await getRequest(url);
  return response;
};
export const getActiveBookings = async () => {
  const url = `/flexdesk/getActiveBookingsInfo?email=mubeen.mohammad@mivada.com`;
  console.log(url);
  const response = await getRequest(url);
  return response;
};

export const setSingleSchedule = async (data) => {
  const url = `/flexdesk/bookSchedule`;
  console.log(data);
  const response = await postRequest(url, data);
  return response;
};
export const setMultipleeSchedule = async (data) => {
  const url = `/flexdesk/bookMultipleSchedule`;
  console.log(data);
  const response = await postRequest(url, data);
  return response;
};
export const editSchedule = async (data) => {
  const url = `/flexdesk/editSchedule`;
  console.log(data);
  const response = await postRequest(url, data);
  return response;
};
export const getFilterData = async () => {
  const url = `/flexdesk/getFilterData`;
  const response = await getRequest(url);
  return response;
};
export const editBooking = async (bookingId, date, startTime, endTime) => {
  const url = `/flexdesk/editBooking?bookingId=${bookingId}&bookingDate=${date}&startTime=${startTime}&endTime=${endTime}`;
  console.log(url);
  const response = await postRequest(url);
  return response;
};

export const setCheckIn = async () => {
  const url = `/flexdesk/getCheckIn?email=${localStorage.getItem("mail")}`;
  const response = await getRequest(url);
  return response;
};

// export const getFilteredDesksInfo = async (
//   jwtToken,
//   locationId,
//   buildingId,
//   floorId,
//   formattedDate,
//   startTime,
//   endTime
// ) => {
//   const url = `/api/desk/getFilteredDesksInfo?locationId=${locationId}&buildingId=${buildingId}&floorId=${floorId}&date=${encodeURIComponent(
//     formattedDate
//   )}&startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(
//     endTime
//   )}`;

//   try {
//     const response = await getRequest(url, jwtToken);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching desk data:", error);
//     throw error;
//   }
// };

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
// export const postBulkBookDesk = async (jwtToken, bookereq) => {
//   const email = localStorage.getItem("email"); // Retrieve the email from local storage
//   const url = `/api/booking/bookBulkDesks?email=${encodeURIComponent(email)}`;

//   try {
//     const response = await postRequest(url, jwtToken, bookereq);

//     return response.data;
//   } catch (error) {
//     console.error("Error booking desk:", error);
//     throw error;
//   }
// };
