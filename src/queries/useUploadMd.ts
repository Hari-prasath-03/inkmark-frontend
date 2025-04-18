import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance, { axiosError } from "../api/axiosInstance";
import { useGlobalContext } from "../context/GlobalContext";
import { md } from "../types/types";

const useUploadMd = () => {
  const queryClient = useQueryClient();
  const { notify } = useGlobalContext();

  return useMutation<void, axiosError, md>({
    mutationFn: (md) => axiosInstance.post("/files/upload-md", md),
    onSuccess: () => {
      notify({ message: "File uploaded successfully", type: "success" });
      queryClient.refetchQueries({ queryKey: ["get-my-files"] });
      queryClient.refetchQueries({ queryKey: ["get-history"] });
    },
    onError: () => notify({ message: "Unable to upload file", type: "error" }),
  });
};

export default useUploadMd;
