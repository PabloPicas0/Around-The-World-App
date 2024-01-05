import {
  Autocomplete,
  Box,
  ButtonGroup,
  IconButton,
  LinearProgress,
  Link,
  Paper,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Brightness4Sharp, Brightness7Sharp, Language, Replay } from "@mui/icons-material";

import {
  iconStyles,
  navbarContainer,
  navbarWrapperStyles,
  searchBarWrapperStyles,
} from "../styles/NavbarStyles";

import { useCallback, useRef } from "react";

import { useParams } from "../Utils/context";

import * as d3 from "d3";

import { path, projection } from "./RenderWorld";

import { links } from "../Utils/sheredData";
import getScale from "../Utils/scale";
import { makeInfoCall } from "../Utils/fetchRequests";

const Navbar = () => {
  const { countryData, setSpinner, setBasicInfo, svgRef, mode, setMode, setImages, spinner, setShowInfo } =
    useParams();

  const autoComplete = useRef(null);

  const handleOption = useCallback(() => {
    if (countryData) {
      const { geometries } = countryData.objects.countries;

      return geometries
        .map((element) => {
          return element.properties.name;
        })
        .sort((a, b) => {
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
        });
    }
    return ["Loading..."];
  }, [countryData]);

  const handleChange = useCallback((event, value) => {
    const { type } = event;

    if ((type === "click" && value !== "") || type === "keydown") {
      const svg = d3.select(svgRef.current);
      const prevCountry = d3.select(".checked");

      prevCountry.classed("checked", false);

      const countryName = value.replace(/\W/g, "");

      const selectedCountry = d3.select(`#${countryName}`);

      selectedCountry.classed("checked", true);

      const { id } = selectedCountry.data()[0];

      setSpinner(true);
      setShowInfo(false);

      makeInfoCall(id).then((info) => {
        const [basicInfo, wikiDescription, images] = info;

        setBasicInfo([basicInfo, wikiDescription]);
        setImages(images);
        setSpinner(false);
        setShowInfo(true);
      });

      const { coordinates } = selectedCountry._groups[0][0].__data__.geometry;

      // Some countries return array of coordinates instead of coordinates
      // This abomination fixes it
      const [x, y] = typeof coordinates[0][0][0] === "object" ? coordinates[1][0][0] : coordinates[0][1];

      d3.transition()
        .duration(1000)
        .tween("goTo", function () {
          const currentCoords = projection.rotate();
          const nextCoords = projection.rotate([-x, -y]).rotate();

          const interp = d3.geoInterpolate(currentCoords, nextCoords);

          return function (t) {
            projection.rotate(interp(t));
            svg.selectAll("path").attr("d", path);
          };
        });
    }
  }, []);

  const handleReset = useCallback(() => {
    const svg = d3.select(svgRef.current);
    const checkedCountry = d3.select(".checked");
    const clearButton = autoComplete.current.getElementsByClassName("MuiAutocomplete-clearIndicator")[0];
    const transform = d3.zoomTransform(svg.node());

    checkedCountry.classed("checked", false);

    if (clearButton) clearButton.click();
    transform.k = 1;

    setShowInfo(false);

    d3.transition()
      .duration(1000)
      .tween("reset", function () {
        const currentCoords = projection.rotate();
        const defaultCoords = projection.rotate([0, -20]).rotate();

        const currentScale = projection.scale();
        const defaultScale = projection.scale(getScale()).scale();

        const interpCoords = d3.geoInterpolate(currentCoords, defaultCoords);
        const interpScale = d3.interpolate(currentScale, defaultScale);

        return function (t) {
          projection.rotate(interpCoords(t)).scale(interpScale(t));
          svg.selectAll("path").attr("d", path);
        };
      });
  }, []);

  return (
    <Paper sx={navbarContainer} elevation={mode === "light" ? 1 : 7} square>
      <Stack direction={"row"} sx={navbarWrapperStyles}>
        <IconButton sx={{ ...iconStyles, display: { xs: "none", md: "inline-flex" } }} disabled>
          <Language fontSize="large" />
        </IconButton>

        <Box sx={searchBarWrapperStyles}>
          <Autocomplete
            ref={autoComplete}
            id="select-box"
            sx={{ width: { xs: "200px", sm: "280px" } }}
            options={handleOption()}
            renderInput={(params) => <TextField {...params} label="Find Country" />}
            onInputChange={handleChange}
          />

          <Tooltip title="Reset" arrow>
            <IconButton sx={iconStyles} color="secondary" onClick={handleReset}>
              <Replay />
            </IconButton>
          </Tooltip>
        </Box>

        <ButtonGroup sx={{ display: { xs: "none", md: "inline-flex" } }}>
          {links.map((link) => {
            const { href, icon, description } = link;

            return (
              <Tooltip key={description} title={description} arrow>
                <Link href={href} target="_blank">
                  <IconButton sx={iconStyles} color="secondary">
                    {icon}
                  </IconButton>
                </Link>
              </Tooltip>
            );
          })}

          <Tooltip key={"colorMode"} title={"Light/Dark mode"} arrow>
            <IconButton
              sx={iconStyles}
              color="secondary"
              onClick={() => setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))}>
              {mode === "light" ? <Brightness4Sharp /> : <Brightness7Sharp />}
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </Stack>
      <LinearProgress sx={{ height: "2px", opacity: spinner ? 1 : 0 }} />
    </Paper>
  );
};

export default Navbar;
