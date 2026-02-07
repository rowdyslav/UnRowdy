import {useEffect, useState} from "react";
import {serviceApi} from "@/share/api/service/serviceApi.ts";
import type {ServiceType} from "@/share/api/service/serviceType.ts";

interface UseServiceParams {
  category_name: string
  max_price: string
  keywords: string
}

interface UseServiceReturn {
  isLoading: boolean
  data: {data: ServiceType[], maxPrice: number } | null
}

export const useService = ({ category_name, max_price, keywords }: UseServiceParams): UseServiceReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<{data: ServiceType[], maxPrice: number, keywords: string } | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true)

        const servicesData = await serviceApi.all({category_name, keywords, max_price, min_price:'1'})
        const maxPrice: number = Number(servicesData.headers['category-maxprice'])

        setData({data: servicesData.data, maxPrice, keywords})
      } catch (err) {
        console.error('Error fetching services:', err)
      } finally {
        setIsLoading(false);
      }
    };

    void fetchServices()
  }, [category_name, keywords]);

  return { isLoading, data};
};