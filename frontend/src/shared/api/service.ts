import {api} from "@/shared/api/axios.ts";
import type {ServiceType} from "@/shared/types/serviceType.ts";

export const service = {
  getServices: () =>
    api.get<ServiceType[]>('/users/me/services'),

  getAllServices: () =>
    api.get<ServiceType[]>('/services?limit=10&offset=0'),

  addService: (data: ServiceType) => {
    return api.post<void>("/users/me/services", {
      name: data.name,
      price: data.price,
      image_b64: data.image_b64,
    });
  },

  deleteService: () => {
    void api.delete('/users/me/services')
  }
}