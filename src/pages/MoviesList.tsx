import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import AddMovieModal from "../components/AddMovieModal";
import { useMovies } from "../hooks/useMovies";
import { useDebounce } from "../hooks/useDebounce";
import Loader from "../components/Loader";
import Button from "../components/Button";
import { EmptyState } from "../components/EmptyState";
import { useModal } from "../hooks/useModal";
import { Movies } from "../components/Movies";
import { Pagination } from "../components/Pagination";

const MovieListPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    movies,
    searchMovies,
    query,
    loading,
    error,
    totalResults,
    searchQuery,
  } = useMovies();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchTerm = useDebounce(query, 500);

  const moviesPerPage = 10;
  const totalPages = Math.ceil(totalResults / moviesPerPage);

  useEffect(() => {
    searchMovies(searchQuery, currentPage);
  }, [searchMovies, searchQuery, currentPage]);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.Title.toLocaleLowerCase().includes(debouncedSearchTerm)
    );
  }, [movies, debouncedSearchTerm]);

  const handleSearch = useCallback(() => {
    searchMovies(query, 1);
    navigate(`?query=${query}`);
  }, [searchMovies, query, navigate]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [currentPage]);

  return (
    <div className="container p-4 mx-auto">
      <div className="flex flex-col items-center mb-4 md:flex-row md:justify-between">
        <SearchBar onSearch={handleSearch} />
        <div className="flex items-end justify-center w-full gap-4 md:w-auto">
          <Button title="Add New" onClick={openModal} />
        </div>
      </div>
      {isModalOpen && <AddMovieModal onClose={closeModal} />}
      {error && <EmptyState>Something went wrong</EmptyState>}
      {loading ? (
        <Loader />
      ) : (
        <div>
          {filteredMovies.length > 0 ? (
            <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
              {filteredMovies.map((movie) => (
                <Movies {...movie} key={movie.imdbID} />
              ))}
            </div>
          ) : (
            <EmptyState>
              Query Not Found, click on Search to perform search
            </EmptyState>
          )}
        </div>
      )}
      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default MovieListPage;
