import { createContext, useContext, useEffect, useState } from "react";

const url = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const context = createContext();

export const useParams = () => {
  return useContext(context);
};

export const ParamsProvider = ({ children }) => {
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCountryData(data));
  }, []);

  return (
    <context.Provider value={{countryData}}>
        {children}
    </context.Provider>
  )
};
