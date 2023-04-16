import { createContext, useContext, useEffect, useRef, useState } from "react";

const url = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const context = createContext();

export const useParams = () => {
  return useContext(context);
};

export const ParamsProvider = ({ children }) => {
  const [countryData, setCountryData] = useState(null);

  const svgRef = useRef(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCountryData(data));
  }, []);

  return (
    <context.Provider value={{countryData, svgRef}}>
        {children}
    </context.Provider>
  )
};