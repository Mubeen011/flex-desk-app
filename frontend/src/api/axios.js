import axios from "axios";
// import axios from "axios";

const client = axios.create({
  //   baseURL: "https://dkzty2qkr8xff.cloudfront.net/",
  baseURL: "http://localhost:8080/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "http://localhost:3000",
  },
});

export const getRequest = async (url) => {
  try {
    const response = await client.get(url);
    return response;
  } catch (error) {
    console.error("Error in GET request:", error);
  }
};

export const postRequest = async (url, data) => {
  console.log(data);
  try {
    const response = await client.post(url, data);
    return response;
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};

export const putRequest = async (url, data) => {
  const response = await client.put(url, data);
  return response;
};

export const deleteRequest = async (url, data) => {
  const response = await client.delete(url, { data });
  return response;
};

export default client;
