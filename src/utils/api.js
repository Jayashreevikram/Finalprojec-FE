import axios from "axios";

export const API = axios.create({
  baseURL: "https://finalproject-be.vercel.app/",
  withCredentials: true,
});
