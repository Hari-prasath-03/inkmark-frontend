import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useGlobalContext } from "../context/GlobalContext";
import axiosInstance, { axiosError } from "../api/axiosInstance";

const useMoveToTrashMd = () => {
  const queryClient = useQueryClient();
  const { notify } = useGlobalContext();

  return useMutation<void, axiosError, string>({
    mutationFn: (id: string) =>
      axiosInstance.delete(`/files/move-to-trash/${id}`),
    onSuccess: () => {
      notify({ message: "File deleted successfully", type: "info" });
      queryClient.refetchQueries({ queryKey: ["get-my-files"] });
      queryClient.refetchQueries({ queryKey: ["get-history"] });
      queryClient.refetchQueries({ queryKey: ["in-trash"] });
      queryClient.refetchQueries({ queryKey: ["get-favorites"] });
    },
    onError: (err) =>
      notify({
        message: err?.response?.data?.error || "Unable to delete file",
        type: "error",
      }),
  });
};

export default useMoveToTrashMd;
