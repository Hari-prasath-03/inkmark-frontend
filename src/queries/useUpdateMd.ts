import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { axiosError } from "../api/axiosInstance";
import { useGlobalContext } from "../context/GlobalContext";

import { md } from "../types/types";

const useUpdateMd = (_id: string) => {
  const queryClient = useQueryClient();
  const { notify } = useGlobalContext();

  return useMutation<void, axiosError, md>({
    mutationFn: (updatedMd) => axiosInstance.put("/files/update-md", updatedMd),
    onSuccess: () => {
      notify({ message: "File updated successfully", type: "info" });
      queryClient.refetchQueries({ queryKey: ["get-my-file", _id] });
      queryClient.refetchQueries({ queryKey: ["get-history"] });
    },
    onError: () => notify({ message: "Unable to update file", type: "error" }),
  });
};

export default useUpdateMd;
