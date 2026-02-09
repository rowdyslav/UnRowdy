import {api} from "@/share/api/axios.ts";
import type {FilterTypes, ServiceType} from "@/share/api/service/serviceType.ts";

export const serviceApi = {
  all: (data: FilterTypes & { category_name?: string }) => {
    const {category_name, keywords, max_price, min_price} = data
    console.log(max_price)
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
