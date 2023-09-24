import RenderWorld from "./Components/RenderWorld";
import Navbar from "./Components/Navbar";
import DisplayInfo from "./Components/DisplayInfo";

import "./App.css";

import { Box, Container, ScopedCssBaseline, ThemeProvider, createTheme } from "@mui/material";

import { useParams } from "./Utils/context";

import { useMemo } from "react";

import getDesignTokens from "./Utils/designMode";
import ImageDialog from "./Components/ImageDialog";

const boxStyles = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "auto 500px" },
  gridTemplateRows: "auto 1fr",
  height: "100vh",
  minHeight: "100vh",
};

function App() {
  const { mode, showInfo } = useParams();
  const { width } = window.screen;

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

  return (
    <ThemeProvider theme={theme}>
      <ScopedCssBaseline enableColorScheme>
        <Container disableGutters maxWidth={false}>
          <Box
            sx={{
              ...boxStyles,
              overflow: (width < 960 && !showInfo) || width > 960 ? "hidden" : "visible",
            }}>
            <Navbar />
            <RenderWorld />
            <DisplayInfo />
            <ImageDialog />
          </Box>
        </Container>
      </ScopedCssBaseline>
    </ThemeProvider>
  );
}

export default App;
