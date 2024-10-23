import { useParams } from "react-router-dom";
import { useMovies } from "../hooks/useMovies";

const MovieDetailsPage = () => {
  // console.log("mounted");
  const { id } = useParams<{ id: string }>();
  const { movies } = useMovies();
  const movie = movies.find((m) => m.imdbID === id);
  console.log(movie);
  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-4xl font-bold">{movie.Title}</h1>
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="object-cover mt-4 w-96 h-96"
      />
      <h3 className="mt-2 font-bold">Title: {movie.Title}</h3>
      <p className="mt-2 font-bold">Year: {movie.Year}</p>
    </div>
  );
};

export default MovieDetailsPage;
