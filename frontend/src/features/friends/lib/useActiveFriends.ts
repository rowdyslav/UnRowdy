import {useQuery} from "@tanstack/react-query";
import {friendsApi} from "@/shared/api/friends";
import type {UserType} from "@/shared/types/userType";

export const useActiveFriends = () => {
  return useQuery<UserType[]>({
    queryKey: ["friends", "active"],

    queryFn: async () => {
      const response = await friendsApi.getFriends("active");
      return response.data;
    },
  });
};