import { createContext, useContext, useEffect, useRef, useState } from "react";

const url = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";
const infoUrl = "https://countryinfoapi.com/api/countries";

const context = createContext();

export const useParams = () => {
  return useContext(context);
};

export const ParamsProvider = ({ children }) => {
  const [countryData, setCountryData] = useState(null);
  const [aboutCountries, setAboutCountries] = useState(null);
  const [basicInfo, setBasicInfo] = useState({})

  const svgRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    Promise.all([
      fetch(url, { signal }).then((response) => response.json()), 
      fetch(infoUrl, { signal }).then((response) => response.json())
    ]).then((data) => {
      const [countryBorders, countryInfo] = data

      setCountryData(countryBorders)
      setAboutCountries(countryInfo);
    });

      return () => {
        controller.abort();
      }
  }, []);

  return (
    <context.Provider value={{ countryData, svgRef, aboutCountries, basicInfo, setBasicInfo }}>
      {children}
    </context.Provider>
  );
};
