import axios from "axios";

export const API = axios.create({
  baseURL: "https://finalproject-be-ow1a.vercel.app/",
  withCredentials: true,
});
