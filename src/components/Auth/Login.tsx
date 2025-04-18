import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance, { axiosError } from "../../api/axiosInstance";

import { AuthChildProps } from "../../pages/Auth";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useAuth } from "../../context/AuthContext";

type userDetials = {
  email: string;
  otp: string;
};

const Login: React.FC<AuthChildProps> = ({ closeAuthLay }) => {
  const {setIsLoggedIn} = useAuth();
  const [loginDetials, setLoginDetials] = useState<userDetials>({
    email: "",
    otp: "",
  });
  const [showOtpField, setShowOtpField] = useState(false);
  const [message, setMessage] = useState<React.ReactNode | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLoginDetials((pv) => ({ ...pv, [e.target.name]: e.target.value }));

  const { mutateAsync: sendOtp, isPending: sendingOtp } = useMutation({
    mutationFn: () =>
      axiosInstance.post("/auth/send-otp", { email: loginDetials.email }),
    onSuccess: () => {
      setShowOtpField(true);
      setMessage(<span className="success-span">Otp sent to your mail</span>);
      setTimeout(() => setMessage(null), 2000);
    },
    onError: (error: axiosError) => {
      setMessage(
        <span className="error-span">{error?.response?.data?.error}</span>
      );
      setTimeout(() => setMessage(null), 2000);
    },
  });

  const { mutateAsync: verifyAndLogin, isPending: verifyingOtp } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/login", loginDetials),
    onSuccess: (response) => {
      const token = response.data.data.token;
      localStorage.setItem("authToken", token);
      setMessage(<span className="success-span">Logged in successfully</span>);
      setIsLoggedIn(true);
      setTimeout(() => closeAuthLay(), 2000);
    },
    onError: (error: axiosError) => {
      setMessage(
        <span className="error-span">{error?.response?.data?.error}</span>
      );
      setTimeout(() => setMessage(null), 2000);
    },
  });

  const handleSubmitSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendOtp();
  };

  const handleSubmitVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyAndLogin();
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl text-center leading-5 font-semibold font-heading text-gray-400 mb-4">
        Already have an account?
        <span className="block text-base">
          {showOtpField ? "Check your mail for OTP" : "Login to continue"}
        </span>
        {message}
      </h2>
      {!showOtpField ? (
        <form onSubmit={handleSubmitSendOtp} className="flex flex-col gap-3">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={loginDetials.email}
            onChange={handleChange}
          />
          <Button type="submit" variant="secondary" disabled={sendingOtp}>
            {sendingOtp ? "Sending OTP..." : "Submit"}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleSubmitVerifyOtp} className="flex flex-col gap-3">
          <Input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={loginDetials.otp}
            onChange={handleChange}
            maxLength={6}
          />
          <Button type="submit" variant="secondary" disabled={verifyingOtp}>
            {verifyingOtp ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default Login;
