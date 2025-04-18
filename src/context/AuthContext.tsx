import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ["ChechLoginStatus"],
    queryFn: () =>
      axiosInstance.get("/auth/check-auth").then((res) => res.data),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  useEffect(() => setIsLoggedIn(data?.isAuthenticated), [data]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
