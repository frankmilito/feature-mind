import { Routes, Route } from "react-router-dom";
import MoviesList from "./pages/MoviesList";
import MovieDetailsPage from "./pages/MoviesDetail";

function App() {
  return (
    <Routes>
      <Route index element={<MoviesList />} />
      <Route path="/movie/:id" element={<MovieDetailsPage />} />
    </Routes>
  );
}

export default App;
