import { createContext, ReactNode, useState } from "react";
import axios from "axios";

interface Movie {
  id: string;
  title: string;
  poster: string;
  // other movie properties
}

interface MovieContextProps {
  movies: Movie[];
  searchMovies: (query: string) => void;
  addMovie: (movie: Movie) => void;
}

export const MovieContext = createContext<MovieContextProps | undefined>(
  undefined
);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const searchMovies = async (query: string) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${query}&apikey=e6c0da32`
    );
    setMovies(response.data.Search || []);
  };

  const addMovie = (movie: Movie) => {
    setMovies((prevMovies) => [movie, ...prevMovies]);
  };

  return (
    <MovieContext.Provider value={{ movies, searchMovies, addMovie }}>
      {children}
    </MovieContext.Provider>
  );
};