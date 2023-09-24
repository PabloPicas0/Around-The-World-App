import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

import { fetchLands } from "./fetchRequests";

import { ScopedCssBaseline, ThemeProvider, createTheme } from "@mui/material";

import getDesignTokens from "./designMode";

const context = createContext();

export const useParams = () => {
  return useContext(context);
};

export const ParamsProvider = ({ children }) => {
  const [countryData, setCountryData] = useState(null);
  const [basicInfo, setBasicInfo] = useState([]);
  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [mode, setMode] = useState("light");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const svgRef = useRef(null);

  const theme = useMemo(() => {
    return createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 400,
          md: 960,
          lg: 1100,
          xl: 1536,
        },
      },
      palette: {
        mode: mode,
        ...getDesignTokens(mode),
      },
    });
  }, [mode]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchLands({ signal }).then((data) => setCountryData(data));

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <context.Provider
      value={{
        countryData,
        svgRef,
        basicInfo,
        setBasicInfo,
        spinner,
        setSpinner,
        mode,
        setMode,
        images,
        setImages,
        imageIndex,
        setImageIndex,
        open,
        setOpen,
        isLoading,
        setIsLoading,
        showInfo,
        setShowInfo,
      }}>
      <ThemeProvider theme={theme}>
        <ScopedCssBaseline enableColorScheme>{children}</ScopedCssBaseline>
      </ThemeProvider>
    </context.Provider>
  );
};
