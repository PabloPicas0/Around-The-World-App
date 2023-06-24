import { createContext, useContext, useEffect, useRef, useState } from "react";
import { fetchLands } from "./fetchRequests";

const context = createContext();

export const useParams = () => {
  return useContext(context);
};

export const ParamsProvider = ({ children }) => {
  const [countryData, setCountryData] = useState(null);
  const [basicInfo, setBasicInfo] = useState({});
  const [spinner, setSpinner] = useState(false)

  const svgRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchLands({ signal }).then((data) => setCountryData(data));

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <context.Provider value={{ countryData, svgRef, basicInfo, setBasicInfo, spinner, setSpinner }}>
      {children}
    </context.Provider>
  );
};
