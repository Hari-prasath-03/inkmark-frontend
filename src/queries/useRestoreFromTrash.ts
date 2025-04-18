import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { axiosError } from "../api/axiosInstance";
import { useGlobalContext } from "../context/GlobalContext";

const useRestoreFromTrash = () => {
  const { notify } = useGlobalContext();
  const queryClient = useQueryClient();

  return useMutation<void, axiosError, string>({
    mutationFn: (id: string) => axiosInstance.post(`/files/restore-from-trash/${id}`),
    onSuccess: () => {
      notify({ message: "Restored successfully", type: "success" });
      queryClient.refetchQueries({ queryKey: ["get-my-files"] });
      queryClient.refetchQueries({ queryKey: ["in-trash"] });
      queryClient.refetchQueries({ queryKey: ["get-history"] });
    },
    onError: () => notify({ message: "Error restoring file", type: "error" }),
  });
};

export default useRestoreFromTrash;
