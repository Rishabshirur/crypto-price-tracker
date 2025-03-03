import React from "react";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  currency: string;
  setCurrency: (value: string) => void;
  supportedCurrencies: string[];
  refetch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  search,
  setSearch,
  currency,
  setCurrency,
  supportedCurrencies,
  refetch,
}) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mb-6">
      <input
        type="text"
        placeholder="Search crypto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-3 border rounded-md w-full sm:w-2/5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={refetch}
        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-all sm:w-24 w-full"
      >
        🔄 Refresh
      </button>
      <select
        value={currency}
        onChange={(e) => {
            e.preventDefault();
            setCurrency(e.target.value);
          }}
        className="p-2 border rounded-md sm:w-24 w-full"
      >
        {supportedCurrencies.map((cur) => (
          <option key={cur} value={cur}>
            {cur.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
