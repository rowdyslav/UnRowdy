import { friendsApi } from "@/shared/api/friends.ts";
import type { UserType } from "@/shared/types/userType.ts";
import type { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

export const useRequestFriends = () => {
  const [requestFriends, setRequestFriends] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRequestFriends = async () => {
    try {
      setLoading(true);
      const response: AxiosResponse<UserType[]> = await friendsApi.getFriends('received');
      setRequestFriends(response.data);
      console.log('Заявки в друзья:',response.data)
    } catch (e) {
      console.error(e);
      setRequestFriends([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestFriends();
  }, []);

  return {
    requestFriends,
    loading,
    refetch: fetchRequestFriends
  };
};