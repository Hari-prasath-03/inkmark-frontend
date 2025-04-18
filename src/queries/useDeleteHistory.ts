import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { axiosError } from "../api/axiosInstance";
import { useGlobalContext } from "../context/GlobalContext";

const useDeleteHistory = () => {
  const { notify } = useGlobalContext();
  const queryClient = useQueryClient();

  return useMutation<void, axiosError, string>({
    mutationFn: (id: string) =>
      axiosInstance.delete(`/files/delete-history/${id}`),
    onSuccess: () => {
      notify({ message: "History deleted", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["get-history"] });
    },
    onError: (error) =>
      notify({
        message: error.response?.data?.error || "Unable to delete",
        type: "error",
      }),
  });
};

export default useDeleteHistory;
