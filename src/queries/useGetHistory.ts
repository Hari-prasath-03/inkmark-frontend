import { useQuery } from "@tanstack/react-query";
import axiosInstance, { axiosError } from "../api/axiosInstance";
import { history } from "../types/types";

const useGetHistory = () => {
  return useQuery<void, axiosError, history[]>({
    queryKey: ["get-history"],
    queryFn: () =>
      axiosInstance
        .get("/files/get-history")
        .then((data) => data.data)
        .then((data) => data.data),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetHistory;
