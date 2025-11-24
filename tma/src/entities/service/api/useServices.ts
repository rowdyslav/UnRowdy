import {useEffect, useState} from "react";
import {serviceApi} from "@/share/api/service/serviceApi.ts";
import type {ServiceType} from "@/share/api/service/serviceType.ts";

interface UseServiceParams {
  category_name: string;
  max_price: string
}

interface UseServiceReturn {
  isLoading: boolean;
  data: {data: ServiceType[], maxPrice: number } | null
}

export const useService = ({ category_name, max_price }: UseServiceParams): UseServiceReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<{data: ServiceType[], maxPrice: number } | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true)

        const servicesData = await serviceApi.all({category_name, max_price, min_price:'1'})
        const maxPrice: number = Number(servicesData.headers['category-maxprice'])

        setData({data: servicesData.data, maxPrice})
      } catch (err) {
        console.error('Error fetching services:', err)
      } finally {
        setIsLoading(false);
      }
    };

    void fetchServices()
  }, [category_name]);

  return { isLoading, data};
};