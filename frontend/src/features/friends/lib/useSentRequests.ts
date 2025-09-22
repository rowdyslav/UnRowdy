import {useQuery} from "@tanstack/react-query";
import type {UserType} from "@/shared/types/userType.ts";
import {friendsApi} from "@/shared/api/friends.ts";

const useSentRequests = () => {
  return useQuery<UserType[]>({
    queryKey: ['friends', 'sent'],

    queryFn: async () => {
      const response = await friendsApi.getFriends('sent')
      return response.data
    }
  })
};

export default useSentRequests;