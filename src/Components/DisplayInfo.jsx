import { Card, CardContent, IconButton, Paper, Typography } from "@mui/material";

import { buttonStyles, buttonWrapperStyles, conatinerStyles, titleStyles } from "../styles/DisplayInfoStyles";

import { useParams } from "../Utils/context";

import * as d3 from "d3";
import { Close, CloseSharp } from "@mui/icons-material";
import { useRef } from "react";
import useOnScreen from "../Utils/detectVisibility";

const DisplayInfo = () => {
  const { basicInfo } = useParams();

  const displayInfoRef = useRef(null);
  const isVisible = useOnScreen(displayInfoRef);

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

    displayInfo.style("transform", "translateX(500px)");
  };

  return (
    <Paper className="info-displayer" ref={displayInfoRef} sx={conatinerStyles} square>
      <aside>
        <div style={buttonWrapperStyles}>
          <IconButton onClick={handleClick} sx={buttonStyles} tabIndex={isVisible ? 0 : -1}>
            <CloseSharp fontSize="large" />
          </IconButton>
        </div>

        <h2 style={titleStyles}>About Country</h2>

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
  );
};

export default DisplayInfo;
