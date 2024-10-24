import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}
const Button: React.FC<ButtonProps> = ({ title, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 text-white bg-blue-500 rounded ${className}`}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
