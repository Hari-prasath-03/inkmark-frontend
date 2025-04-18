import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { axiosError } from "../api/axiosInstance";
import { useGlobalContext } from "../context/GlobalContext";

const useAddAndRemoveFav = () => {
  const { notify } = useGlobalContext();
  const queryClient = useQueryClient();

  return useMutation<{ data: { message: string } }, axiosError, string>({
    mutationFn: (id: string) =>
      axiosInstance.post(`/files/add-remove-to-favorite/${id}`),
    onSuccess: (data) => {
      notify({ message: data?.data?.message, type: "info" });
      queryClient.refetchQueries({ queryKey: ["get-favorites"] });
      queryClient.refetchQueries({ queryKey: ["get-my-files"] });
    },
    onError: () =>
      notify({ message: "Unable to add favorites", type: "error" }),
  });
};

export default useAddAndRemoveFav;
