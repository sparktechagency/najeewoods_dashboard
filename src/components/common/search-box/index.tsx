import { Input } from "@/components/ui";
import { childrenProps } from "@/types";
import { Search } from "lucide-react";
import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext<{ searchText: string; setSearchText: (text: string) => void } | null>(null);

export default function SearchProvider({children}:childrenProps) {
  const [searchText, setSearchText] = useState("");
  

  return (
   <SearchContext.Provider value={{ searchText, setSearchText }}>
    {children}
   </SearchContext.Provider>
  );
}


export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
