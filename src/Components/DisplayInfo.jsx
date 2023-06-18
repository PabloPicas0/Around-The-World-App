import { Card, CardContent, IconButton, Paper, ThemeProvider, Typography, createTheme } from "@mui/material";

import { useParams } from "../Context/context";

import * as d3 from "d3";

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

const DisplayInfo = () => {
  const { basicInfo } = useParams();

  const {
    name = "No information",
    population = 0,
    area = 0,
    capital = "No information",
    languages = {},
  } = basicInfo || {};

  const handleNumberFormat = (number = 0) => {
    return new Intl.NumberFormat("en", { notation: "compact" }).format(number);
  };

  const handleLanguages = (language = { test: 0 }) => {
    const convertedLanguage = Object.entries(language);

    if (convertedLanguage.length === 0) return [["lang", "No information"]];

    return convertedLanguage;
  };

  const handleClick = () => {
    const displayInfo = d3.select(".info-displayer");

    displayInfo.style("transform", "translate(500px)");
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        className="info-displayer"
        style={{ transform: "translateX(500px)", transition: "transform 250ms ease-in-out" }}
        sx={{ width: { xs: window.innerWidth, sm: "400px" }, zIndex: 1337 }}>
        <aside>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <IconButton
              onClick={handleClick}
              sx={{ width: "38px", height: "38px", fontWeight: 200, color: "black" }}>
              X
            </IconButton>
          </div>

          <h2 style={{ textAlign: "center" }}>About Country</h2>

          <Card>
            <CardContent>
              <Typography variant="h6" component={"p"}>
                Country: {name}
              </Typography>
              <Typography variant="h6">Capital: {capital}</Typography>
              <Typography variant="h6">
                Languages: {handleLanguages(languages).map((language) => `${language[1]}, `)}
              </Typography>
              <Typography variant="h6">Population: {handleNumberFormat(population)}</Typography>
              <Typography variant="h6">Area: {handleNumberFormat(area)}</Typography>
            </CardContent>
          </Card>

          <div>test 2</div>
        </aside>
      </Paper>
    </ThemeProvider>
  );
};

export default DisplayInfo;
