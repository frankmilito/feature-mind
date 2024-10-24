import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

type Movie = {
  imdbID: string;
  Title: string;
  Poster: string;
  Year?: string;
};

export type MovieContextProps = {
  movies: Movie[];
  searchMovies: (query: string, page?: number) => void;
  addMovie: (movie: Movie) => void;
  setRecentSearchQueries: Dispatch<SetStateAction<string[]>>;
  setQuery: Dispatch<SetStateAction<string>>;
  recentSearchQueries: string[];
  query: string;
  loading: boolean;
  error: boolean;
  totalResults: number;
  searchQuery: string;
};

export const MovieContext = createContext<MovieContextProps | undefined>(
  undefined
);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "Avengers";
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(searchQuery);
  const [error, setError] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [recentSearchQueries, setRecentSearchQueries] = useState<Array<string>>(
    () => {
      const savedQueries = localStorage.getItem("recentQueries");
      return savedQueries ? JSON.parse(savedQueries) : [];
    }
  );

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const searchMovies = useCallback(async (query: string, page?: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&type=&page=${page}&apikey=e6c0da32`
      );
      setMovies(response.data.Search || []);
      setTotalResults(+response.data.totalResults);
    } catch (error) {
      setError(true);
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
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
      loading,
      totalResults,
      error,
      searchQuery,
    }),
    [
      movies,
      recentSearchQueries,
      setRecentSearchQueries,
      setQuery,
      searchMovies,
      query,
      loading,
      totalResults,
      error,
      searchQuery,
    ]
  );

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
