import type {FilterTypes} from "@/share/api/service/types.ts";
import {api} from "@/share/api/axios.ts";
import type {ServiceType} from "@/entities/service/types/serviceTypes.ts";

export const serviceApi = {
  all: (data: FilterTypes & { category_name?: string }) => {
    const { category_name, keywords, max_price, min_price } = data

    return api.get<ServiceType[]>('/services', {
      params: {
        ...(category_name && { category_name }),
        ...(keywords && { keywords }),
        ...(max_price && { max_price }),
        ...(min_price && { min_price }),
      }
    })
  }
}
