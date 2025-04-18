import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { axiosError } from "../api/axiosInstance";
import { useGlobalContext } from "../context/GlobalContext";

const useClearHistory = () => {
  const { notify } = useGlobalContext();
  const queryClient = useQueryClient();

  return useMutation<void, axiosError, void>({
    mutationFn: () => axiosInstance.delete("/files/clear-history"),
    onSuccess: () => {
      notify({ message: "History cleared", type: "success" });
      queryClient.refetchQueries({ queryKey: ["get-history"] });
    },
    onError: (error) =>
      notify({
        message: error.response?.data?.error || "Unable to clear history",
        type: "error",
      }),
  });
};

export default useClearHistory;
