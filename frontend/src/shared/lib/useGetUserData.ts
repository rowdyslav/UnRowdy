import {useQuery} from "@tanstack/react-query";
import type {UserType} from "@/shared/types/userType";
import {userApi} from "@/shared/api/user.ts";

export const useGetUserData = (username: string) => {
  return useQuery<UserType[]>({
    queryKey: ["user", username],

    queryFn: async () => {
      const response = await userApi.getInfo(username)
      return response.data
    },
  });
};