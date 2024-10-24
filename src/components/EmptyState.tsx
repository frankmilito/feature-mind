import { ReactNode } from "react";

export const EmptyState = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="flex justify-center w-full italic font-semibold text-center">
      {children}
    </h1>
  );
};
