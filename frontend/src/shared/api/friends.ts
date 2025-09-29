import {api} from "@/shared/api/axios.ts";
import type {UserType} from "@/shared/types/userType.ts";

export const friendsApi = {
  getMyFriends: (type: "active" | "sent" | "received") =>
    api.get<UserType[]>(`/users/me/friends?friend_type=${type}`),

  getFriends: (type: "active" | "sent" | "received", id: string) =>
    api.get<UserType[]>(`/users/${id}/friends?friend_type=${type}`),

  addFriend: (userId: string) =>
    api.patch<void>(`/users/me/friends/${userId}`),

  removeFriend: (userId: string) =>
    api.delete<void>(`/users/me/friends/${userId}`),
};