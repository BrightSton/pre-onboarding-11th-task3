import axios from "axios";

export const searchAPI = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getSearchData = async (input = "") => {
  const response = await searchAPI.get(`/sick?q=${input}`);

  return response.data;
};
