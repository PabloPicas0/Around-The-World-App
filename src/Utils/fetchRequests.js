export const makeInfoCall = async (id) => {
  // Kosovo has no ccn3
  // switch to cca3
  if (!id) id = "KOS";

  const call = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
  const data = await call.json();

  return data;
};

export const fetchLands = async (options) => {
  const call = await fetch("https://unpkg.com/world-atlas@2.0.2/countries-110m.json", options);
  const data = await call.json();

  return data;
};
