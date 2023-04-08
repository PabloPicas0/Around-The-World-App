import { useEffect, useState } from "react";

import * as d3 from "d3";
import { feature } from "topojson-client";

const url = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

// Dimmensions for svg element
const w = 960;
const h = 600;
const margin = { top: 30, right: 10, bottom: 30, left: 15 };

const RenderWorld = () => {
  const [country, setCountry] = useState(null);

  // Useful source documentation about crating world map
  // Source: https://observablehq.com/@d3/world-map-svg
  const outline = { type: "Sphere" };
  const graticule = d3.geoGraticule10();
  const projection = d3.geoOrthographic().scale(250).center([0, 0]).rotate([0, -20]);
  const path = d3.geoPath(projection);

  useEffect(() => {
    d3.json(url).then((response) => {
      const geojsonCountries = feature(response, response.objects.countries);

      setCountry(geojsonCountries);
    });
  }, []);

  console.log(country);

  return (
    <>
      {!country ? (
        <h1>Loading...</h1>
      ) : (
        <svg width={w} height={h}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <g id="country-map">
              <path className="sphere" d={path(outline)}></path>
              <path d={path(graticule)} className="graticule"></path>
              {country.features.map((feature) => (
                <path
                  key={feature.properties.name}
                  id={feature.id}
                  className="country"
                  d={path(feature)}></path>
              ))}
            </g>
          </g>
        </svg>
      )}
    </>
  );
};

export default RenderWorld;
