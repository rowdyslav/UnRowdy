import {useEffect, useState} from "react";
import {categoriesApi} from "@/share/api/categories/categories.ts";
import type {CategoryType} from "@/share/api/categories/categoryType.ts";

interface useCategoriesReturn {
  isLoading: boolean;
  data: CategoryType[] | null
}

export const useCategories = ({ _id }: { _id?: string }): useCategoriesReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<CategoryType[] | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true)
        const servicesData = await (_id ? categoriesApi.getSubCategories(_id) : categoriesApi.getCategories())
        setData(servicesData.data)
      } catch (err) {
        console.error('Error fetching services:', err)
      } finally {
        setIsLoading(false);
      }
    };

    void fetchServices()
  }, [_id]);

  return { isLoading, data};
};