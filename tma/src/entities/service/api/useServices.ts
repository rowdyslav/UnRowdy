import {useEffect, useState} from "react";
import {serviceApi} from "@/share/api/service/serviceApi.ts";
import type {ServiceType} from "@/entities/service/types/serviceTypes.ts";

interface UseServiceParams {
  category_name: string;
}

interface UseServiceReturn {
  isLoading: boolean;
  data: ServiceType[] | null
}

export const useService = ({ category_name }: UseServiceParams): UseServiceReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ServiceType[] | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true)
        const servicesData = await serviceApi.all({ category_name })
        setData(servicesData.data)
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