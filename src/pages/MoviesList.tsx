import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import AddMovieModal from "../components/AddMovieModal";
import { useMovies } from "../hooks/useMovies";
import { useDebounce } from "../hooks/useDebounce";

const MovieListPage: React.FC = () => {
  const { movies, searchMovies, query } = useMovies();
  const [isModalOpen, setModalOpen] = useState(false);
  const debouncedValue = useDebounce(query, 300);

  useEffect(() => {
    searchMovies("Avengers");
  }, [searchMovies]);

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLocaleLowerCase().includes(debouncedValue)
  );
  return (
    <div className="container p-4 mx-auto">
      <div className="flex items-center justify-between mb-4">
        <SearchBar onSearch={searchMovies} />
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Add New
        </button>
      </div>
      {isModalOpen && <AddMovieModal onClose={() => setModalOpen(false)} />}
      <div className="grid grid-cols-4 gap-4">
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
    </div>
  );
};

export default MovieListPage;
