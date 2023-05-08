import { Autocomplete, Button, Stack, TextField, Typography } from "@mui/material";
import { useRef } from "react";

import { useParams } from "../Context/context";

import * as d3 from "d3";
import { path, projection } from "./RenderWorld";

const Navbar = () => {
  const { countryData, svgRef } = useParams();

  const autoComplete = useRef(null);

  const handleOption = () => {
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
  };

  const handleChange = (event, value) => {
    const { type } = event;

    if ((type === "click" && value !== "") || type === "keydown") {
      const svg = d3.select(svgRef.current);
      const countryNameBox = d3.select(".country-name");
      const prevCountry = d3.select(".checked");

      prevCountry.classed("checked", false);
      countryNameBox.text(value);

      const countryName = value.replace(/\W/g, "");

      const selectedCountry = d3.select(`#${countryName}`);

      selectedCountry.classed("checked", true);

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
  };

  const handleReset = () => {
    const svg = d3.select(svgRef.current);
    const checkedCountry = d3.select(".checked");
    const countryNameBox = d3.select(".country-name");
    const clearButton = autoComplete.current.getElementsByClassName("MuiAutocomplete-clearIndicator")[0];
    const transform = d3.zoomTransform(svg.node());

    checkedCountry.classed("checked", false);
    countryNameBox.text("Country Name");
    if (clearButton) clearButton.click();
    transform.k = 1

    d3.transition()
      .duration(1000)
      .tween("reset", function () {
        const currentCoords = projection.rotate();
        const defaultCoords = projection.rotate([0, -20]).rotate();

        const currentScale = projection.scale();
        const defaultScale = projection.scale(230).scale();

        const interpCoords = d3.geoInterpolate(currentCoords, defaultCoords);
        const interpScale = d3.interpolate(currentScale, defaultScale);

        return function (t) {
          projection.rotate(interpCoords(t)).scale(interpScale(t));
          svg.selectAll("path").attr("d", path);
        };
      });
  };

  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Autocomplete
        ref={autoComplete}
        id="select-box"
        sx={{ width: 280 }}
        options={handleOption()}
        renderInput={(params) => <TextField {...params} label="Find Country" />}
        onInputChange={handleChange}
      />
      <Typography className="country-name" variant="h6" style={{marginRight: "120px"}}>
        Country Name
      </Typography>
      <Button variant="outlined" onClick={handleReset}>
        Reset
      </Button>
    </Stack>
  );
};

export default Navbar;
