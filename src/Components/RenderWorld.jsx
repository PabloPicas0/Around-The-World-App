import { useEffect, useRef } from "react";

import { useParams } from "../Utils/context";

import { onMouseDown, onMouseMove, onMouseOut, onMouseUp } from "../Utils/mouseFn";
import { tooltipStyles } from "../styles/RenderWorldStyles";

import * as d3 from "d3";
import { feature } from "topojson-client";

import { Box } from "@mui/system";
import getScale from "../Utils/scale";
import { makeInfoCall } from "../Utils/fetchRequests";

export const projection = d3.geoOrthographic().scale(getScale()).center([0, 0]).rotate([0, -20]);
export const path = d3.geoPath(projection);

// Dimmensions for svg element
const margin = { top: 30, right: 10, bottom: 30, left: 15 };

// Useful source documentation about crating world map
// Source: https://observablehq.com/@d3/world-map-svg
const outline = { type: "Sphere" };
const graticule = d3.geoGraticule10();

const RenderWorld = () => {
  const { countryData, svgRef, setBasicInfo, setSpinner, setImages, setShowInfo } = useParams();

  const worldWrapperRef = useRef();

  useEffect(() => {
    if (!countryData) return;

    const svg = d3.select(svgRef.current);
    svg
      .style("width", worldWrapperRef.current.clientWidth)
      .style("height", worldWrapperRef.current.clientHeight);
    const scale = getScale();

    // Drag method on svg element
    const drag = d3
      .drag()
      .on("drag", (e) => {
        // projection.rotate() give us array with x, y, z coordinates
        const [x, y] = projection.rotate();
        const sens = 100 / projection.scale();

        // We are changing projection coordinates taking old coords
        // And adding ammount of x and y from cursor on drag event
        projection.rotate([x + e.dx * sens, y - e.dy * sens]);

        svg.selectAll("path").attr("d", path);
      })
      .on("start", onMouseDown)
      .on("end", onMouseUp);

    const zoom = d3.zoom().on("zoom", (e) => {
      // zoom, 230, e.transform.k, svg
      if (e.transform.k > 0.4 && e.transform.k < 15) {
        d3.transition()
          .duration(50)
          .tween("zoom", function () {
            const currentScale = projection.scale();
            const nextScale = projection.scale(scale * e.transform.k).scale();

            const interp = d3.interpolate(currentScale, nextScale);

            return function (t) {
              projection.scale(interp(t));
              svg.selectAll("path").attr("d", path);
            };
          });
      } else {
        const k = e.transform.k <= 0.4 ? 0.4 : 15;
        e.transform.k = k;
      }
    });

    const onClick = (e) => {
      const { id } = e.target.__data__;

      const prevCountry = d3.select(".checked");
      const nextCountry = d3.select(`#${e.target.id}`);

      prevCountry.classed("checked", false);
      nextCountry.classed("checked", true);

      setSpinner(true);
      setShowInfo(false)

      makeInfoCall(id).then((info) => {
        const [basicInfo, wikiDescription, images] = info;

        setBasicInfo([basicInfo, wikiDescription]);
        setImages(images);
        setSpinner(false);
        setShowInfo(true)
      });

      // Get the clicked point in px
      const [x, y] = d3.pointer(e);

      // Convert the clicked point to coordinates
      const clickCoords = projection.invert([x, y]);

      // Create transition on each click
      d3.transition()
        .duration(700)
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

    svg.call(drag).call(zoom);

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

    // Cleanup on unmounting component
    return () => {
      svg.select("#container").remove();
    };
  }, [countryData]);

  return (
    <Box className="world-wrapper" ref={worldWrapperRef}> 
      <svg ref={svgRef} viewBox={`0 0 ${960} ${600}`} id="world-map"></svg>
      <Box id="tooltip" sx={tooltipStyles}></Box>
    </Box>
  );
};

export default RenderWorld;
