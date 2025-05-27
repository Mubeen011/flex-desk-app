// import { getRequest } from "./axios.js";

// export const getActiveBookings = async (jwtToken, username) => {
//   const url = `/api/bookings/getActiveBookingsInfo?email=${username}`;

//   try {
//     const response = await getRequest(url, jwtToken);

//     return response;
//   } catch (error) {
//     console.error("Error fetching active bookings:", error);
//     throw error;
//   }
// };

// export const getPastBookings = async (jwtToken, username) => {
//   const url = `/api/bookings/getPastBookingsInfo?email=${username}`; // API endpoint for fetching past bookings

//   try {
//     const response = await getRequest(url, jwtToken);

//     return response;
//   } catch (error) {
//     console.error("Error fetching past bookings:", error);
//     throw error;
//   }
// };

// export const fetchRole = async () => {
//   try {
//     const email = localStorage.getItem("email");
//     const token = localStorage.getItem("access_token");
//     const url = `/api/bookings/getRole?email=${encodeURIComponent(email)}`;
//     const response = await getRequest(url, token);

//     if (response?.data) {
//       const role = response.data;
//       localStorage.setItem("userRole", role);
//       localStorage.setItem("userRoleExtra", role);
//       // setUserRole(role); // Update state
//       return role;
//     }
//   } catch (error) {
//     console.error("Failed to fetch role:", error);
//     return null;
//   }
// };
