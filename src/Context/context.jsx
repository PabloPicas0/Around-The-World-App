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

  const handleNewsFetch = (countryName) => {
    const infoUrl = `https://countryinfoapi.com/api/countries/name/${countryName}`;
    const fallbackQoute = "https://api.themotivate365.com/stoic-quote";

    fetch(infoUrl)
      .then((res) => res.json())
      .then((data) => {
        setNews(data)
        console.log(data)
      });
  };

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
    <context.Provider value={{countryData, svgRef, news, handleNewsFetch}}>
        {children}
    </context.Provider>
  )
};
