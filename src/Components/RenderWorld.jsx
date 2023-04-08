import { useEffect, useState } from "react";

import * as d3 from "d3";
import { feature } from "topojson-client";

const url = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

const margin = { top: 30, right: 10, bottom: 30, left: 15 };

const RenderWorld = () => {
  const [country, setCountry] = useState(null);
  const [land, setLand] = useState(null);

  const outline = { type: "Sphere" };
  const graticule = d3.geoGraticule10()
  const projection = d3.geoOrthographic();
  const path = d3.geoPath(projection);

  useEffect(() => {
    d3.json(url).then((response) => {
      const geojsonCountries = feature(response, response.objects.countries);
      const geojsonLand = feature(response, response.objects.land);

      setCountry(geojsonCountries);
      setLand(geojsonLand);
    });
  }, []);

  console.log(country);

  return (
    <>
      {!country ? (
        <p>Please refesh the page</p>
      ) : (
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
      )}
    </>
  );
};

export default RenderWorld;
