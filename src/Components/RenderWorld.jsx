import { useEffect, useRef, useState } from "react";

import * as d3 from "d3";
import { feature } from "topojson-client";

const url = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

// Dimmensions for svg element
const w = 960;
const h = 600;
const margin = { top: 30, right: 10, bottom: 30, left: 15 };

const RenderWorld = () => {
  const svgRef = useRef(null);

  // Useful source documentation about crating world map
  // Source: https://observablehq.com/@d3/world-map-svg
  const outline = { type: "Sphere" };
  const graticule = d3.geoGraticule10();
  const projection = d3.geoOrthographic().scale(230).center([0, 0]).rotate([0, -20]);
  const path = d3.geoPath(projection);

  useEffect(() => {
    // Selected svg elemnt using d3 and react ref
    const svg = d3.select(svgRef.current);

    // Drag method on svg element
    const drag = d3.drag().on("drag", (e) => {
      // projection.rotate() give us array with x, y, z coordinates
      const [x, y] = projection.rotate();
      const sens = 80 / projection.scale();

      // We are changing projection coordinates taking old coords
      // And adding ammount of x and y from cursor on drag event
      projection.rotate([x + e.dx * sens, y - e.dy * sens]);

      svg.selectAll("path").attr("d", path);
    });

    const zoom = d3.zoom().on("zoom", (e) => {
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

    const onMouseMove = (event) => {
      const tooltip = d3.select("#tooltip");
      const { name } = event.target.__data__.properties;

      tooltip
        .style("left", `${event.x - 5}px`)
        .style("top", `${event.y + 20}px`)
        .style("opacity", 0.8)
        .text(`${name}`);
    };

    const onMouseOut = () => {
      const tooltip = d3.select("#tooltip");

      tooltip.style("opacity", 0);
    };

    const onClick = (e) => {
      // Get the clicked point px
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

    d3.json(url).then((response) => {
      const geojsonCountries = feature(response, response.objects.countries);

      // After fetching data we create path elements in countries g elemnt
      countries
        .selectAll("path")
        .data(geojsonCountries.features)
        .enter()
        .append("path")
        .attr("class", "country")
        .attr("d", path)
        .on("mousemove", onMouseMove)
        .on("mouseout", onMouseOut)
        .on("click", onClick);
    });

    // Cleanup on unmounting component
    return () => {
      svg.select("#container").remove();
    };
  }, []);

  return (
    <>
      <svg ref={svgRef} width={w} height={h}></svg>
      <div id="tooltip"></div>
    </>
  );
};

export default RenderWorld;
