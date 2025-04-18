import clsx from "clsx";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "destructive" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  full?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  className = "",
  full = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex font-semibold items-center justify-center rounded-md transition-colors duration-150";

  const variants = {
    primary: "bg-slate-50 text-neutral-800 hover:bg-slate-100",
    secondary: "bg-indigo-500 text-neutral-50 hover:bg-indigo-600",
    destructive: "bg-red-600 text-neutral-50 hover:bg-red-700",
    outline: "border border-gray-500 text-gray-400 hover:bg-neutral-700",
    ghost: "bg-transparent text-gray-300 hover:bg-neutral-600",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-1.5 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const isDisabled = isLoading || disabled;

  return (
    <button
      disabled={isDisabled}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        isDisabled && "opacity-50 cursor-not-allowed",
        full && "w-full",
        className
      )}
      {...props}
    >
      {isLoading && (
        <AiOutlineLoading3Quarters className="animate-spin size-3.5 mr-2" />
      )}
      {children}
    </button>
  );
};

export default Button;
