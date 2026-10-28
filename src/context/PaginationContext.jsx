import React, { createContext, useContext, useState } from "react";

const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const [paginationLimit, setPaginationLimit] = useState(10); // Default page size

  const updatePagination = (value) => {
    setPaginationLimit(value === "all" ? 99999 : Number(value));
  };

  return (
    <PaginationContext.Provider value={{ paginationLimit, updatePagination }}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => useContext(PaginationContext);