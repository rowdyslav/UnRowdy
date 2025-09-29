import {useQuery} from "@tanstack/react-query";
import type {UserType} from "@/shared/types/userType.ts";
import {friendsApi} from "@/shared/api/friends.ts";

const useRequestsOut = () => {
  return useQuery<UserType[]>({
    queryKey: ['friends', 'sent'],

    queryFn: async () => {
      const response = await friendsApi.getMyFriends('sent')
      return response.data
    }
  })
};

export default useRequestsOut;