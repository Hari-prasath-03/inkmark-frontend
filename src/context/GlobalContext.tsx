import { createContext, useContext, ReactNode } from "react";
import useNotification from "../hooks/useNotification";


interface GlobalContextProps {
  notify: ({ message, type }: { message: string; type: string }) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

const GlobalProvider = ({ children }: { children: ReactNode }) => {

  const { notify, NotificationContainer } = useNotification({
    position: "top-right",
    ttl: 2500,
  });

  const contextValue = { notify };
  return (
    <GlobalContext.Provider value={contextValue as GlobalContextProps}>
      {children}
      {NotificationContainer()}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export default GlobalProvider;
