import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { axiosError } from "../api/axiosInstance";
import { useGlobalContext } from "../context/GlobalContext";

const useClearTrashMds = () => {
  const { notify } = useGlobalContext();
  const queryClient = useQueryClient();

  return useMutation<void, axiosError, void>({
    mutationFn: () => axiosInstance.delete("/files/clear-trash"),
    onSuccess: () => {
      notify({ message: "Trash cleared successfully", type: "success" });
      queryClient.refetchQueries({ queryKey: ["in-trash"] });
    },
    onError: (err) =>
      notify({
        message: err.response?.data.error || "Unable to clear Trash",
        type: "error",
      }),
  });
};

export default useClearTrashMds;
