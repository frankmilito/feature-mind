import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../context/MovieContext";

export const Movies: React.FC<Movie> = ({
  imdbID,
  Poster,
  Title,
  Year,
  Type,
}) => {
  return (
    <Link to={`/movie/${imdbID}`} key={imdbID}>
      <div className="p-4 bg-gray-200 rounded">
        <img
          src={Poster}
          alt={Title}
          className="object-cover w-full md:w-72 h-60"
          loading="lazy"
        />
        <h3 className="mt-2 text-sm font-semibold">{Title}</h3>
        <p className="mt-2 font-bold">{Year}</p>
        <p className="mt-2 font-bold">{Type}</p>
      </div>
    </Link>
  );
};
