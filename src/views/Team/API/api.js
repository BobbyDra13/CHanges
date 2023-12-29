import axios from "axios";

const BASE_URL = "http://localhost:3001/users";

export const getStores = async (id) => {
  id = id || "";
  try {
    return await axios.get(`${BASE_URL}/${id}`);
  } catch (error) {
    console.log("Error while calling stores api ", error);
  }
};

export const addStore = async (user) => {
  return await axios.post(`${BASE_URL}`, user);
};

export const deleteStore = async (id) => {
  return await axios.delete(`${BASE_URL}/${id}`);
};

export const editStore = async (id, user) => {
  return await axios.put(`${BASE_URL}/${id}`, user);
};
