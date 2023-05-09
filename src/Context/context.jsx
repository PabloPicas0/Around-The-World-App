import { createContext, useContext, useEffect, useRef, useState } from "react";

const url = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const context = createContext();

export const useParams = () => {
  return useContext(context);
};

export const ParamsProvider = ({ children }) => {
  const [countryData, setCountryData] = useState(null);
  const [news, setNews] = useState(null);

  const svgRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    fetch(url, { signal })
      .then((response) => response.json())
      .then((data) => setCountryData(data));

      return () => {
        controller.abort();
      }
  }, []);

  return (
    <context.Provider value={{countryData, svgRef, news, setNews}}>
        {children}
    </context.Provider>
  )
};
