import RenderWorld from "./Components/RenderWorld";
import Navbar from "./Components/Navbar";
import DisplayInfo from "./Components/DisplayInfo";

import { ParamsProvider } from "./Utils/context";

import "./App.css";

import { Box, Container, ThemeProvider, createTheme } from "@mui/material";

// TODO
// Add third API with news or someting like that about country https://api.unsplash.com/
// Consider change API with coutry info to https://restcountries.com/#rest-countries
// Work on more responsvie navbar
// Changed position of display info component based on breakpoints
// Additionally you can work on globe scale change on different breakpoints

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 900,
      lg: 1100,
      xl: 1536,
    },
  },
});

function App() {
  const boxStyles = {
    display: "grid",
    gridTemplateColumns: "auto 400px",
    gridTemplateRows: "auto 1fr",
    height: "100vh",
    minHeight: "100vh",
    overflowX: "hidden",
  };

  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters maxWidth={false}>
        <Box sx={boxStyles}>
          <ParamsProvider>
            <Navbar />
            <RenderWorld />
            <DisplayInfo />
          </ParamsProvider>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
