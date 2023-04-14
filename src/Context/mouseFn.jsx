import * as d3 from "d3";

export const onMouseMove = (event) => {
  const tooltip = d3.select("#tooltip");
  const { name } = event.target.__data__.properties;

  tooltip
    .style("left", `${event.x - 5}px`)
    .style("top", `${event.y + 20}px`)
    .style("opacity", 0.8)
    .text(`${name}`);
};

export const onMouseOut = () => {
  const tooltip = d3.select("#tooltip");

  tooltip.style("opacity", 0);
};

export const onMouseDown = () => {
  const svgCursor = document.querySelector("svg").style;
  svgCursor.cursor = "grabbing";
};

export const onMouseUp = () => {
  const svgCursor = document.querySelector("svg").style;
  svgCursor.cursor = "grab";
};
