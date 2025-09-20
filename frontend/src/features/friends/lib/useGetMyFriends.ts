import {friendsApi} from "@/shared/api/friends.ts";
import type {UserType} from "@/shared/types/userType.ts";
import type {AxiosResponse} from "axios";
import {useEffect, useState} from "react";

export const useGetMyFriends = () => {
  const [myFriends, setMyFriends] = useState<UserType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const getMyFriends = async () => {
    try {
      setLoading(true)
      const response: AxiosResponse<UserType[]> = await friendsApi.getFriends("active")
      const response1: AxiosResponse<UserType[]> = await friendsApi.getFriends("sent")
      setMyFriends(response.data)
      console.log('друзья:',response.data)
      console.log('Отправленные заявки а друзья:', response1.data)
      setLoading(false)
    } catch (e) {
      console.log(e)
      return []
    }
  }

  useEffect(() => {
    getMyFriends();
  }, []);

  return {myFriends, loading}
}
