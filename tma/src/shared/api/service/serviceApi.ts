import {api} from "@/shared/api/axios.ts";
import type {FilterTypes, ServiceType} from "@/shared/api/service/serviceType.ts";

export const serviceApi = {
  all: (data: FilterTypes & { category_name?: string }) => {
    const {category_name, keywords, max_price, min_price} = data
    return api.get<ServiceType[]>('/services', {
      params: {
        ...(category_name && {category_name}),
        ...(keywords && {keywords}),
        ...(max_price && {max_price}),
        ...(min_price && {min_price}),
        tma: true
      }
    })
  }
}
