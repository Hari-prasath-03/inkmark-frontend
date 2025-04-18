import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  value: string | number;
}

const Input: React.FC<InputProps> = ({ type, value, ...props }) => {
  return (
    <input
      type={type}
      value={value}
      {...props}
      className="w-full font-semibold px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none focus:border focus:placeholder:text-indigo-400 focus:border-indigo-400"
    />
  );
};

export default Input;
