import axiosInstance, { axiosError } from "../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { md } from "../types/types";

const useGetMyMds = () => {
  
  return useQuery<void, axiosError, md[]>({
    queryKey: ["get-my-files"],
    queryFn: () =>
      axiosInstance
        .get("/files/my-md")
        .then((data) => data.data)
        .then((data) => data.data),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 10,
  });
};

export default useGetMyMds;
