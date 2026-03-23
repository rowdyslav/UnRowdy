import {useCallback, useMemo} from "react";
import {categoriesApi} from "@/shared/api/categories/categoriesApi.ts";
import type {CategoryType} from "@/shared/api/categories/categoryType.ts";
import {useAsyncData} from "@/shared/lib/hooks/useAsyncData.ts";

interface UseCategoriesReturn {
  isLoading: boolean;
  data: CategoryType[];
  error: string | null;
}

interface UseCategoriesParams {
  parentId?: string;
  enabled?: boolean;
}

export const useCategories = ({parentId, enabled = true}: UseCategoriesParams): UseCategoriesReturn => {
  const initialData = useMemo<CategoryType[]>(() => [], []);
  const fetchCategories = useCallback(async () => {
    const response = parentId
      ? await categoriesApi.getSubCategories(parentId)
      : await categoriesApi.getCategories();

    return response.data;
  }, [parentId]);

  const {data, isLoading, error} = useAsyncData<CategoryType[]>({
    initialData,
    enabled,
    fetcher: fetchCategories,
  });

  return {isLoading, data, error};
};
