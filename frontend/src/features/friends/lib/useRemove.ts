import {friendsApi} from "@/shared/api/friends.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useRemove = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await friendsApi.removeFriend(id);
    },

    onSuccess: () => {
      void queryClient.invalidateQueries({queryKey: ["friends", "active"]});
    },

    onError: (err) => {
      console.error("Ошибка при удалении друга:", err);
    },
  });
};