import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import axios from "axios";

type Movie = {
  imdbID: string;
  Title: string;
  Poster: string;
  Year?: string;
};

type MovieContextProps = {
  movies: Movie[];
  searchMovies: (query: string) => void;
  addMovie: (movie: Movie) => void;
  setRecentSearchQueries: Dispatch<SetStateAction<string[]>>;
  setQuery: Dispatch<SetStateAction<string>>;
  recentSearchQueries: string[];
  query: string;
};

export const MovieContext = createContext<MovieContextProps | undefined>(
  undefined
);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [recentSearchQueries, setRecentSearchQueries] = useState<Array<string>>(
    () => {
      const savedQueries = localStorage.getItem("recentQueries");
      return savedQueries ? JSON.parse(savedQueries) : [];
    }
  );

  const searchMovies = useCallback(async (query: string) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${query}&apikey=e6c0da32`
    );
    setMovies(response.data.Search || []);
  }, []);

  const addMovie = (movie: Movie) => {
    setMovies((prevMovies) => [movie, ...prevMovies]);
  };

  const value = useMemo(
    () => ({
      movies,
      searchMovies,
      addMovie,
      recentSearchQueries,
      setRecentSearchQueries,
      setQuery,
      query,
    }),
    [
      movies,
      recentSearchQueries,
      setRecentSearchQueries,
      setQuery,
      searchMovies,
      query,
    ]
  );

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
