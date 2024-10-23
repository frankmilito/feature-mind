import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMovies } from "../hooks/useMovies";
import useClickOutside from "../pages/useClickOutside";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const inputRef = useRef(null);
  const [showRecentQuery, setShowRecent] = useState(false);
  const { setRecentSearchQueries, recentSearchQueries, setQuery, query } =
    useMovies();
  const handleSearch = () => {
    if (query) {
      onSearch(query);
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

  return (
    <div className="flex flex-col" ref={containerRef}>
      <div className="flex space-x-2 ">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-64 p-2 border rounded"
          placeholder="Search for movies..."
          ref={inputRef}
          onClick={() => setShowRecent(true)}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Search
        </button>
      </div>
      <div className="relative">
        <div className="absolute w-64 ">
          {showRecentQuery && (
            <ul className=" bg-[#ececec] rounded-b-md">
              {filteredItems.map((item, index) => (
                <li
                  className="p-2 text-xs border-b-2 hover:bg-white"
                  key={index}
                  onClick={() => setQuery(item)}
                >
                  {item}
                </li>
              ))}
              <p className="p-2 text-xs italic border-t-2 border-gray-300">
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
