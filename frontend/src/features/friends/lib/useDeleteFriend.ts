import {friendsApi} from "@/shared/api/friends.ts";

export const useDeleteFriend = () => {
  const deleteFriend = async (id: string) => {
    try {
      await friendsApi.removeFriend(id);
    } catch (e) {
      console.error(e);
    }
  };

  return {deleteFriend};
};