import React from "react";
import Button from "./Button";

type PaginationProps = {
  handleNextPage: VoidFunction;
  handlePreviousPage: VoidFunction;
  currentPage: number;
  totalPages: number;
};
export const Pagination: React.FC<PaginationProps> = ({
  handleNextPage,
  handlePreviousPage,
  currentPage,
  totalPages,
}) => {
  return (
    <div className="flex justify-between mt-4">
      <Button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded ${
          currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
        }`}
        title="Previous"
      />
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded ${
          currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
        }`}
        title="Next"
      />
    </div>
  );
};
