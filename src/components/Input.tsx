import {
  ChangeEventHandler,
  InputHTMLAttributes,
  MouseEventHandler,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

const Input: React.FC<InputProps> = ({
  value,
  type = "text",
  className,
  ...props
}) => {
  return (
    <input
      type={type}
      value={value}
      className={`w-64 p-2 border rounded ${className}`}
      placeholder="Search for movies..."
      {...props}
    />
  );
};

export default Input;
