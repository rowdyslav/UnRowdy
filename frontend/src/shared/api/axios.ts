import axios from "axios";

export const api = axios.create({
  baseURL: "https://",
  headers: {
    "Content-Type": "application/json",
  },
});