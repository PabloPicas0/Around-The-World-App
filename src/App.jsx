import RenderWorld from "./Components/RenderWorld";
import Navbar from "./Components/Navbar";
import DisplayInfo from "./Components/DisplayInfo";

import { ParamsProvider } from "./Utils/context";

import "./App.css";

import { Box, Container, ThemeProvider, createTheme } from "@mui/material";

// TODO
// Add third API with news or someting like that about country https://api.unsplash.com/
// Consider change API with coutry info to https://restcountries.com/#rest-countries
// Additionally you can work on globe scale change on different breakpoints
// there are some bugs with transform when you click on some country
// Disable close icons on xs breakpoint and replace it with icons from navbar

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 960,
      lg: 1100,
      xl: 1536,
    },
  },
});

function App() {
  const boxStyles = {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "auto 400px" },
    gridTemplateRows: "auto 1fr",
    height: "100vh",
    minHeight: "100vh",
    overflowX: "hidden",
  };

  return (
    <ParamsProvider>
      <ThemeProvider theme={theme}>
        <Container disableGutters maxWidth={false}>
          <Box sx={boxStyles}>
            <Navbar />
            <RenderWorld />
            <DisplayInfo />
          </Box>
        </Container>
      </ThemeProvider>
    </ParamsProvider>
  );
}

export default App;
