import { useQuery } from "@tanstack/react-query";
import { friendsApi } from "@/shared/api/friends";
import type { UserType } from "@/shared/types/userType";

export const useRequestFriends = () => {
  return useQuery<UserType[]>({
    queryKey: ["friends", "request"],

    queryFn: async () => {
      const response = await friendsApi.getFriends("received");
      return response.data;
    },
  });
};