import {friendsApi} from "@/shared/api/friends.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useDeleteFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await friendsApi.removeFriend(id);
    },

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["friends", "active"] });
    },

    onError: (err) => {
      console.error("Ошибка при удалении друга:", err);
    },
  });
};