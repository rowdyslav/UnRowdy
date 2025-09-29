import {useQuery} from "@tanstack/react-query";
import type {UserType} from "@/shared/types/userType";
import {userApi} from "@/shared/api/user.ts";

export const useGetUserData = (id: string) => {
  return useQuery<UserType>({
    queryKey: ["user"],

    queryFn: async () => {
      const response = await userApi.getInfo(id)
      return response.data;
    },
  });
};