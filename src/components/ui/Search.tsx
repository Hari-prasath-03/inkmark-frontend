import React from "react";

interface SearchProps extends 
React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ value, handleSearch, ...props }) => {
  return (
    <input
      value={value}
      onChange={handleSearch}
      className="border border-gray-300 rounded-md p-2 w-1/3 focus:outline-indigo-300"
      {...props}
    />
  );
};

export default Search;
