import {api} from "@/shared/api/axios.ts";

export const friendsApi = {
  getFriends: (type: "active" | "sent" | "received") =>
    api.get(`/users/me/friends?friends_type=${type}`),

  addFriend: (userId: string) =>
    api.patch(`/users/me/friends/${userId}`),

  removeFriend: (userId: string) =>
    api.delete(`/users/me/friends/${userId}`),
};