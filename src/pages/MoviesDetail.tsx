import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { EmptyState } from "../components/EmptyState";
import { Movie } from "../context/MovieContext";
import { useMovies } from "../hooks/useMovies";

const MovieDetailsPage = () => {
  const navigate = useNavigate();
  const { movies } = useMovies();
  const { id } = useParams<{ id: string }>();

  const movie = movies.find((m: Movie) => m.imdbID === id);

  if (!movie) {
    return <EmptyState>Movie not found</EmptyState>;
  }

  return (
    <div className="container p-4 mx-auto">
      <Button className="mb-4 " title="Back" onClick={() => navigate(-1)} />
      <h1 className="text-4xl font-bold">{movie.Title}</h1>
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="object-cover mt-4 w-96 h-96"
        rel="preload"
      />
      <h3 className="mt-2 font-bold">Title: {movie.Title}</h3>
      <p className="mt-2 font-bold">Year: {movie.Year}</p>
    </div>
  );
};

export default MovieDetailsPage;
