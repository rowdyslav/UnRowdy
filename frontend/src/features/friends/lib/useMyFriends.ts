import {useQuery} from "@tanstack/react-query";
import {friendsApi} from "@/shared/api/friends";
import type {UserType} from "@/shared/types/userType";

export const useMyFriends = () => {
  return useQuery<UserType[]>({
    queryKey: ["friends", "active"],

    queryFn: async () => {
      const response = await friendsApi.getMyFriends("active");
      return response.data;
    },
  });
};