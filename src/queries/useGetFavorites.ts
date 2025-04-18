import axiosInstance, { axiosError } from "../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { md } from "../types/types";

const useGetFavorites = () => {
  return useQuery<void, axiosError, md[]>({
    queryKey: ["get-favorites"],
    queryFn: () =>
      axiosInstance
        .get("/files/get-favorite")
        .then((data) => data.data)
        .then((data) => data.data),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetFavorites;
