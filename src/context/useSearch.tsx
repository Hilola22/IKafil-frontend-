"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextType {
  searchTitle: string;
  setSearchTitle: (title: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchTitle, setSearchTitle] = useState("");

  return (
    <SearchContext.Provider value={{ searchTitle, setSearchTitle }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
