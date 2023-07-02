import RenderWorld from "./Components/RenderWorld";
import Navbar from "./Components/Navbar";
import DisplayInfo from "./Components/DisplayInfo";

import "./App.css";

import { Box, Container, ScopedCssBaseline, ThemeProvider, createTheme } from "@mui/material";

import { useParams } from "./Utils/context";

import { useMemo } from "react";

import getDesignTokens from "./Utils/designMode";
import ImageDialog from "./Components/ImageDialog";

// TODO
// Add third API with news or someting like that about country https://api.unsplash.com/

function App() {
  const { mode } = useParams();

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

  const boxStyles = {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "auto 500px" },
    gridTemplateRows: "auto 1fr",
    height: "100vh",
    minHeight: "100vh",
    overflowX: "hidden",
  };

  return (
    <ThemeProvider theme={theme}>
      <ScopedCssBaseline enableColorScheme>
        <Container disableGutters maxWidth={false}>
          <Box sx={boxStyles}>
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
