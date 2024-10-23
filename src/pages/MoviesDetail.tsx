import React from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { movies } = React.useContext(MovieContext)!;
  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      <img
        src={movie.poster}
        alt={movie.title}
        className="object-cover mt-4 w-96 h-96"
      />
    </div>
  );
};

export default MovieDetailsPage;
