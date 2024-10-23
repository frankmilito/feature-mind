import { Routes, Route } from "react-router-dom";
import MoviesList from "./pages/MoviesList";

function App() {
  return (
    <Routes>
      <Route index element={<MoviesList />} />
    </Routes>
  );
}

export default App;
