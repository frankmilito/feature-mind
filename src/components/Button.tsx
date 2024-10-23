import React, { HTMLAttributes } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  title: string;
  onClickHandler?: VoidFunction;
}
const Button: React.FC<ButtonProps> = ({
  title,
  onClickHandler,
  className,
}) => {
  return (
    <button
      onClick={onClickHandler}
      className={`px-4 py-2 text-white bg-blue-500 rounded ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;
