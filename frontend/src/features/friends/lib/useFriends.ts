import {useQuery} from "@tanstack/react-query";
import {friendsApi} from "@/shared/api/friends";
import type {UserType} from "@/shared/types/userType";

export const useFriends = (id: string) => {
  return useQuery<UserType[]>({
    queryKey: ["friends", id],

    queryFn: async () => {
      const response = await friendsApi.getFriends("active", id);
      return response.data;
    },
  });
};