import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import Input from "../ui/Input";
import Button from "../ui/Button";
import axiosInstance, { axiosError } from "../../api/axiosInstance";
import { AuthChildProps } from "../../pages/Auth";
import { useAuth } from "../../context/AuthContext";

type userDetials = {
  name: string;
  email: string;
  otp: string;
};

const Signup: React.FC<AuthChildProps> = ({ closeAuthLay }) => {
  const {setIsLoggedIn} = useAuth();
  const [registerDetials, setRegisterDetials] = useState<userDetials>({
    name: "",
    email: "",
    otp: "",
  });
  const [showOtpField, setShowOtpField] = useState<boolean>(false);
  const [message, setMessage] = useState<React.ReactNode | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRegisterDetials((pv) => ({ ...pv, [e.target.name]: e.target.value }));

  const { mutateAsync: sendOtp, isPending: sendingOtp } = useMutation({
    mutationFn: () =>
      axiosInstance.post("/auth/send-otp", { email: registerDetials.email }),
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

  const { mutateAsync: verifyAndRegister, isPending: verifyingOtp } =
    useMutation({
      mutationFn: () => axiosInstance.post("/auth/register", registerDetials),
      onSuccess: () => {
        setMessage(<span className="success-span">Account created</span>);
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
    await verifyAndRegister();
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl text-center leading-5 font-semibold font-heading text-gray-400 mb-4">
        {showOtpField ? (
          "Check your email for OTP"
        ) : (
          <>
            New to InkMark?
            <span className="block text-base">Create account</span>
          </>
        )}
        {message}
      </h2>
      {!showOtpField ? (
        <form onSubmit={handleSubmitSendOtp} className="flex flex-col gap-3">
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={registerDetials.name}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={registerDetials.email}
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
            value={registerDetials.otp}
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

export default Signup;
