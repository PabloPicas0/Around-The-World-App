import {
  Box,
  ButtonGroup,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  IconButton,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { CloseSharp, Language } from "@mui/icons-material";

import { buttonStyles, buttonWrapperStyles, conatinerStyles, titleStyles } from "../styles/DisplayInfoStyles";

import { useParams } from "../Utils/context";
import useOnScreen from "../Utils/detectVisibility";

import * as d3 from "d3";
import { useRef } from "react";
import { links } from "../Utils/sheredData";

const DisplayInfo = () => {
  const { basicInfo, spinner } = useParams();

  const displayInfoRef = useRef(null);
  const isVisible = useOnScreen(displayInfoRef);

  const {
    name = "No information",
    population = 0,
    area = 0,
    capital = "No information",
    languages = {},
  } = basicInfo[0] || {};

  const { extract = "No informaton" } = basicInfo[1] || {};

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

  const aboutCard = (
    <Card sx={{ marginTop: "20px" }}>
      <CardContent>
        <h2 style={titleStyles}>About Country</h2>
        <Divider />

        <Typography variant="h6" component={"p"} marginY={"5px"}>
          Country: {name.common}
        </Typography>

        <Typography variant="h6" marginY={"5px"}>
          Capital: {capital}
        </Typography>

        <Typography variant="h6" marginY={"5px"}>
          Languages: {handleLanguages(languages).map((language) => `${language[1]}, `)}
        </Typography>

        <Typography variant="h6" marginY={"5px"}>
          Population: {handleNumberFormat(population)}
        </Typography>

        <Typography variant="h6" marginY={"5px"}>
          Area: {handleNumberFormat(area)}
        </Typography>
      </CardContent>
    </Card>
  );

  const descriptionCard = (
    <Card sx={{ marginTop: "20px" }}>
      <CardContent>
        <h2 style={titleStyles}>Description</h2>
        <Divider />

        <Typography variant="h6" component={"p"} marginY={"20px"} lineHeight={"35px"}>
          {extract}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Paper className="info-displayer" ref={displayInfoRef} sx={conatinerStyles} square>
      <aside style={{ textAlign: "center" }}>
        <Box sx={buttonWrapperStyles}>
          <IconButton
            onClick={handleClick}
            sx={{ ...buttonStyles, display: { xs: "none", md: "inline-flex" } }}
            tabIndex={isVisible ? 0 : -1}>
            <CloseSharp fontSize="large" />
          </IconButton>

          <IconButton
            sx={{ ...buttonStyles, display: { xs: "inline-flex", md: "none" }, marginLeft: "20px" }}
            disabled>
            <Language fontSize="large" />
          </IconButton>

          <ButtonGroup sx={{ display: { xs: "inline-flex", md: "none" }, marginRight: "20px" }}>
            {links.map((link, idx) => {
              const { href, icon, description } = link;

              return (
                <Link key={idx} href={href} target="_blank">
                  <IconButton aria-label={description} sx={buttonStyles}>
                    {icon}
                  </IconButton>
                </Link>
              );
            })}
          </ButtonGroup>
        </Box>

        {spinner ? (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              display: { xs: "none", md: "inline-block" },
            }}
          />
        ) : (
          [aboutCard, descriptionCard]
        )}
      </aside>
    </Paper>
  );
};

export default DisplayInfo;
