import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import AddMovieModal from "../components/AddMovieModal";
import { useMovies } from "../hooks/useMovies";
import { useDebounce } from "../hooks/useDebounce";
import Loader from "../components/Loader";
import Button from "../components/Button";
import { EmptyState } from "../components/EmptyState";

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
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedValue = useDebounce(query, 500);

  const moviesPerPage = 10;
  const totalPages = Math.ceil(totalResults / moviesPerPage);
  useEffect(() => {
    searchMovies(searchQuery, currentPage);
  }, [searchMovies, searchQuery, currentPage]);

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLocaleLowerCase().includes(debouncedValue)
  );

  const handleSearch = () => {
    searchMovies(query, 1);
    navigate(`?query=${query}`);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="container p-4 mx-auto">
      <div className="flex items-center justify-between mb-4">
        <SearchBar onSearch={handleSearch} />
        <Button title="Add New" onClick={() => setModalOpen(true)} />
      </div>
      {isModalOpen && <AddMovieModal onClose={() => setModalOpen(false)} />}
      {error && <EmptyState>Something went wrong</EmptyState>}
      {loading ? (
        <Loader />
      ) : (
        <div>
          {filteredMovies.length > 0 ? (
            <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
              {filteredMovies.map((movie) => (
                <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
                  <div className="p-4 bg-gray-200 rounded">
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="object-cover w-full h-60"
                    />
                    <h3 className="mt-2 font-bold">{movie.Title}</h3>
                    <p className="mt-2 font-bold">{movie.Year}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState>
              Query Not Found, click on Search to perform search
            </EmptyState>
          )}
        </div>
      )}
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
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-blue-500 text-white"
          }`}
          title="Next"
        />
      </div>
    </div>
  );
};

export default MovieListPage;
