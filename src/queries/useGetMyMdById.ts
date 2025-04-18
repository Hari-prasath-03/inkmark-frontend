import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

const useGetMyMdById = (mdId: string) => {
  return useQuery({
    queryKey: ["get-my-file", mdId],
    queryFn: () =>
      axiosInstance(`/files/my-md/${mdId}`)
        .then((data) => data.data)
        .then((data) => data.data),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetMyMdById;
