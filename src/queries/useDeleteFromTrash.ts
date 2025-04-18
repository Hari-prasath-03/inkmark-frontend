import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { axiosError } from "../api/axiosInstance";
import { useGlobalContext } from "../context/GlobalContext";

const useDeleteFromTrash = () => {
  const { notify } = useGlobalContext();
  const queryClient = useQueryClient();

  return useMutation<void, axiosError, string>({
    mutationFn: (id: string) =>
      axiosInstance.delete(`/files/delete-trash/${id}`),
    onSuccess: () => {
      notify({ message: "File deleted successfully", type: "success" });
      queryClient.refetchQueries({ queryKey: ["in-trash"] });
    },
    onError: () => notify({ message: "Error deleting file", type: "error" }),
  });
};

export default useDeleteFromTrash;
