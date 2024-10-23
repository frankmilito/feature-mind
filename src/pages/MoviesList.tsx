import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import AddMovieModal from "../components/AddMovieModal";
import { useMovies } from "../hooks/useMovies";

const MovieListPage: React.FC = () => {
  const { movies, searchMovies } = useMovies();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    searchMovies("Avengers");
  }, []);

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
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className="p-4 bg-gray-200 rounded">
              <img
                src={movie.poster}
                alt={movie.title}
                className="object-cover w-full h-60"
              />
              <h3 className="mt-2 font-bold">{movie.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieListPage;
