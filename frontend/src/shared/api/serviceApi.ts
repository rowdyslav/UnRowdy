import {api} from "@/shared/api/axios.ts";
import type {ServiceType} from "@/shared/types/serviceType.ts";

export const serviceApi = {
  getServices:() =>
    api.get<ServiceType[]>('/users/me/services'),

  addService:(data: ServiceType) =>
    api.post<void>('/users/me/services', {
      name: data.name,
      price: data.price,
      img: data.img
    }),

  deleteService:() => {
    void api.delete('/users/me/services')
  }
}