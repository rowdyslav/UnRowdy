import {api} from "@/share/api/axios.ts";

export const authApi = {
  auth: (tgid: number, tgusername: string) => api.post('/auth/tg', {tgid, tgusername}),
}