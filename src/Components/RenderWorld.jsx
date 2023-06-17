import { useEffect } from "react";

import { useParams } from "../Context/context";

import { onMouseDown, onMouseMove, onMouseOut, onMouseUp } from "../Context/OtherFn";

import * as d3 from "d3";
import { feature } from "topojson-client";

import { Box } from "@mui/system";

export const projection = d3.geoOrthographic().scale(200).center([0, 0]).rotate([0, -20]);
export const path = d3.geoPath(projection);

// Dimmensions for svg element
const w = 960;
const h = 600;
const margin = { top: 30, right: 10, bottom: 30, left: 15 };

// Useful source documentation about crating world map
// Source: https://observablehq.com/@d3/world-map-svg
const outline = { type: "Sphere" };
const graticule = d3.geoGraticule10();

const RenderWorld = () => {
  const { countryData, aboutCountries, svgRef, setBasicInfo } = useParams();

  useEffect(() => {
    // Selected svg elemnt using d3 and react ref
    const svg = d3.select(svgRef.current);

    // Drag method on svg element
    const drag = d3
      .drag()
      .on("drag", (e) => {
        // projection.rotate() give us array with x, y, z coordinates
        const [x, y] = projection.rotate();
        const sens = 80 / projection.scale();

        // We are changing projection coordinates taking old coords
        // And adding ammount of x and y from cursor on drag event
        projection.rotate([x + e.dx * sens, y - e.dy * sens]);

        svg.selectAll("path").attr("d", path);
      })
      .on("start", onMouseDown)
      .on("end", onMouseUp);

    const zoom = d3.zoom().on("zoom", (e) => {
      // zoom, 230, e.transform.k, svg
      if (e.transform.k > 0.4 && e.transform.k < 5) {
        d3.transition()
          .duration(50)
          .tween("zoom", function () {
            const currentScale = projection.scale();
            const nextScale = projection.scale(230 * e.transform.k).scale();

            const interp = d3.interpolate(currentScale, nextScale);

            return function (t) {
              projection.scale(interp(t));
              svg.selectAll("path").attr("d", path);
            };
          });
      } else {
        const k = e.transform.k <= 0.4 ? 0.4 : 5;
        e.transform.k = k;
      }
    });

    const onClick = (e) => {
      const { name } = e.target.__data__.properties;
      const { id } = e.target.__data__;

      const countryNameBox = d3.select(".country-name");
      const prevCountry = d3.select(".checked");
      const nextCountry = d3.select(`#${e.target.id}`);
      const displayInfo = d3.select(".info-displayer");

      prevCountry.classed("checked", false);
      nextCountry.classed("checked", true);
      displayInfo.style("transform", "translateX(0px)");
      countryNameBox.text(name);

      const findCountry = aboutCountries.find((country) => country.ccn3 === id);

      setBasicInfo(findCountry);

      // Get the clicked point in px
      const [x, y] = d3.pointer(e);

      // Convert the clicked point to coordinates
      const clickCoords = projection.invert([x, y]);

      // Create transition on each click
      d3.transition()
        .duration(1000)
        .tween("rotate", function () {
          const currentCoords = projection.rotate();
          const nextCoords = projection.rotate([-clickCoords[0], -clickCoords[1]]).rotate();

          const interp = d3.geoInterpolate(currentCoords, nextCoords);

          // Redraw the globe
          return function (t) {
            projection.rotate(interp(t));
            svg.selectAll("path").attr("d", path);
          };
        });
    };

    svg.call(drag);
    svg.call(zoom);

    // Creating conatiner
    const container = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .attr("id", "container");

    const globe = container.append("g").attr("class", "globe");
    const countries = container.append("g").attr("class", "countries");

    // Adding two path elements thaht give outline and graticule
    globe.append("path").datum(outline).attr("class", "sphere").attr("d", path);
    globe.append("path").datum(graticule).attr("class", "graticule").attr("d", path);

    if (countryData) {
      const geojsonCountries = feature(countryData, countryData.objects.countries);

      // After fetching data we create path elements in countries g elemnt
      countries
        .selectAll("path")
        .data(geojsonCountries.features)
        .enter()
        .append("path")
        .attr("class", "country")
        .attr("id", (el) => el.properties.name.replace(/\W/g, ""))
        .attr("d", path)
        .on("mousemove", onMouseMove)
        .on("mouseout", onMouseOut)
        .on("click", onClick);
    }

    // Cleanup on unmounting component
    return () => {
      svg.select("#container").remove();
    };
  }, [countryData]);

  return (
    <div className="world-wrapper">
      <svg ref={svgRef} viewBox={`0 0 ${w} ${h}`} id="world-map"></svg>
      <Box id="tooltip" sx={{ display: { xs: "none", md: "block" } }}></Box>
    </div>
  );
};

export default RenderWorld;
