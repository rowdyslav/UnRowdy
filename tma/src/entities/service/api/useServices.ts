import {useCallback, useMemo} from "react";
import {serviceApi} from "@/shared/api/service/serviceApi.ts";
import type {ServiceType} from "@/shared/api/service/serviceType.ts";
import {useAsyncData} from "@/shared/lib/hooks/useAsyncData.ts";

interface UseServiceParams {
  categoryName: string;
  maxPrice?: string;
  keywords: string;
}

interface UseServiceReturn {
  isLoading: boolean;
  services: ServiceType[];
  maxPrice: number | null;
  error: string | null;
}

interface ServicesPayload {
  services: ServiceType[];
  maxPrice: number | null;
}

export const useService = ({categoryName, maxPrice = "", keywords}: UseServiceParams): UseServiceReturn => {
  const initialData = useMemo<ServicesPayload>(() => ({
    services: [],
    maxPrice: null,
  }), []);
  const fetchServices = useCallback(async () => {
    const response = await serviceApi.all({
      category_name: categoryName,
      keywords,
      max_price: maxPrice,
      min_price: "1",
    });
    const nextMaxPrice = Number(response.headers["category-maxprice"]);

    return {
      services: response.data,
      maxPrice: Number.isFinite(nextMaxPrice) ? nextMaxPrice : null,
    };
  }, [categoryName, keywords, maxPrice]);

  const {data, isLoading, error} = useAsyncData<ServicesPayload>({
    initialData,
    fetcher: fetchServices,
  });

  return {
    isLoading,
    services: data.services,
    maxPrice: data.maxPrice,
    error,
  };
};
