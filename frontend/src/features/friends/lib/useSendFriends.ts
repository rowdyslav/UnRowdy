import {friendsApi} from "@/shared/api/friends.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {UserType} from "@/shared/types/userType.ts";

export const useSendFriends = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await friendsApi.addFriend(id);
    },

    onSuccess: (_, id) => {
      queryClient.setQueryData<UserType[]>(["friends", "request"], (old) =>
        old ? old.filter(user => user.id !== id) : []
      );
      void queryClient.invalidateQueries({queryKey: ["friends", "active"]});
      void queryClient.invalidateQueries({queryKey: ["friends", "sent"]})
    },

    onError: (err) => {
      console.error("Ошибка при отправке запроса в друзья:", err);
    },
  });
};