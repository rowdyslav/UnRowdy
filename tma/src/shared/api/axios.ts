import axios from 'axios'
import {env} from "@/shared/config/env.ts";

export const api = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

