import {friendsApi} from "@/shared/api/friends.ts";

export const useSendFriends = () => {
  const sendRequest = async (id: string) => {
    try {
      await friendsApi.addFriend(id);
    } catch (e) {
      console.error(e);
    }
  };

  return {addFriend: sendRequest};
};