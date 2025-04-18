import { useQuery } from "@tanstack/react-query";
import axiosInstance, { axiosError } from "../api/axiosInstance";
import { md } from "../types/types";

const useGetInTrashMds = () => {
  return useQuery<void, axiosError, md[]>({
    queryKey: ["in-trash"],
    queryFn: () =>
      axiosInstance
        .get("/files/get-trash")
        .then((data) => data.data)
        .then((data) => data.data),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 10,
  });
};

export default useGetInTrashMds;
