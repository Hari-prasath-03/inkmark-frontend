import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import clsx from "clsx";

import Button from "../components/ui/Button";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import { useAuth } from "../context/AuthContext";

import { IoCloseOutline } from "react-icons/io5";

import axiosInstance from "../api/axiosInstance";

export interface AuthChildProps {
  closeAuthLay: () => void;
}

const Auth = ({ closeAuthLay }: { closeAuthLay: () => void }) => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState<React.ReactNode>(<span></span>);

  const activeClass = useCallback(
    (bool: boolean) =>
      clsx(
        `relative before-underline ${bool ? "before:w-full" : "before:w-0"}`
      ),
    []
  );

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      setMessage(
        <span className="text-green-600">Logged out successfully</span>
      );
      setTimeout(() => setIsLoggedIn(false), 1000);
      setTimeout(() => closeAuthLay(), 1500);
    },
  });

  return (
    <>
      <IoCloseOutline
        onClick={closeAuthLay}
        className="absolute cursor-pointer top-3 right-3 text-neutral-300 size-12 sm:size-14 p-1 animate-fromRight"
      />
      <motion.div
        className="fixed left-0 bottom-0 flex flex-col items-center w-screen min-h-[65vh] bg-white/95 py-8 cursor-auto *:font-nuniti"
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <h1 className="text-center text-indigo-600 tracking-tight font-heading font-bold text-4xl md:text-5xl text-text mb-3">
          {isLoggedIn ? "Already logged in" : "Login / Signup"}
        </h1>
        {message}
        <div className="p-6 bg-transparent w-full max-w-lg mx-auto">
          {isLoggedIn ? (
            <div className="flex flex-col items-center justify-center gap-8">
              <Button onClick={() => logout()} variant="secondary" size="lg">
                Logout
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-around mb-4">
                <button
                  className={`py-1 px-3 font-heading font-semibold text-xl text-gray-500 ${activeClass(
                    isLogin
                  )}`}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
                <button
                  className={`py-1 px-3 font-heading font-semibold text-xl text-gray-500 ${activeClass(
                    !isLogin
                  )}`}
                  onClick={() => setIsLogin(false)}
                >
                  Signup
                </button>
              </div>
              {isLogin ? (
                <Login closeAuthLay={closeAuthLay} />
              ) : (
                <Register closeAuthLay={closeAuthLay} />
              )}
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Auth;
