import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

export function useMovies() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("MovieContext not found; missing MovieContext");
  }

  return context;
}
