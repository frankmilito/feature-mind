import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useMovies } from "../hooks/useMovies";
import useClickOutside from "../hooks/useClickOutside";
import Input from "./Input";
import Button from "./Button";

const SearchBar = ({ onSearch }: { onSearch: VoidFunction }) => {
  const [showRecentQuery, setShowRecent] = useState(false);
  const { setRecentSearchQueries, recentSearchQueries, setQuery, query } =
    useMovies();

  const handleSearch = () => {
    if (query.trim()) {
      onSearch();
      setRecentSearchQueries((prev) => [query, ...prev]);
    }
  };

  const filteredItems = useMemo(() => {
    return recentSearchQueries
      .filter((recentQuery) => recentQuery.includes(query))
      .slice(0, 10);
  }, [query, recentSearchQueries]);

  useEffect(() => {
    localStorage.setItem("recentQueries", JSON.stringify(recentSearchQueries));
  }, [recentSearchQueries]);

  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setShowRecent(false));

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  return (
    <div className="flex flex-col" ref={containerRef}>
      <div className="flex space-x-2 ">
        <Input
          placeholder="Search for movies..."
          value={query}
          onChange={handleQueryChange}
          onClick={() => setShowRecent(true)}
        />
        <Button title="Search" onClick={handleSearch} />
      </div>
      <div className="relative">
        <div className="absolute z-20 w-64">
          {showRecentQuery && (
            <ul className=" bg-[#ececec] rounded-b-md">
              {filteredItems.map((item, index) => (
                <li
                  className="p-2 text-xs italic border-b-2 hover:bg-white"
                  key={index}
                  onClick={() => setQuery(item)}
                >
                  {item}
                </li>
              ))}
              <p className="p-2 text-xs italic font-semibold border-t-2 border-gray-300">
                Last 10 search results
              </p>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
