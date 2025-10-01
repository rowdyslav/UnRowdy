import {useQuery} from "@tanstack/react-query";
import {friendsApi} from "@/shared/api/friends";
import type {UserType} from "@/shared/types/userType";

export const useFriends = (id: string) => {
  return useQuery<UserType[]>({
    queryKey: ["friends", "active", id],

    // если передан id, получаем друзей по нему, в ином случае получаем своих друзей
    queryFn: async () => {
      const response = await (id
        ? friendsApi.getFriends("active", id)
        : friendsApi.getMyFriends("active"));

      return response.data;
    },
  });
};