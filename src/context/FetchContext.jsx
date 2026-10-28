import { createContext, useContext, useState } from "react";
import axios from "axios";
import { advisorUrl } from "@/dapp";

const FetchContext = createContext({ store: {}, fetchData: () => {} });

export const FetchProvider = ({ children }) => {
  const [store, setStore] = useState({});

  const fetchData = async ({ key, url, formdata, method = "post" }) => {
    if (method === "post") {
      const data = await axios.post(`${advisorUrl}${url}`, formdata);
      setStore((prev) => ({
        ...prev,
        [key]: data?.data?.[key],
      }));
      return data;
    } else if (method === "get") {
      const data = await axios.get(`${advisorUrl}${url}`, formdata);
      setStore((prev) => ({
        ...prev,
        [key]: data?.data?.[key],
      }));
      return data;
    }
  };

  return (
    <FetchContext.Provider value={{ store, fetchData }}>
      {children}
    </FetchContext.Provider>
  );
};

export const useFetch = () => {
  const context = useContext(FetchContext);
  if (!context) {
    throw new Error("useFetch must be used within a FetchProvider");
  }
  return context;
};
