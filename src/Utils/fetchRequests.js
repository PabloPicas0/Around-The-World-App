export const makeInfoCall = async (id) => {
  // Kosovo has no ccn3 id
  // switch to cca3 id
  if (!id) id = "KOS";

  const basicInfoCall = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
  const basicInfoData = await basicInfoCall.json();

  const { name } = basicInfoData[0];

  if (name.common === "DR Congo") name.common = "Democratic Republic of the Congo";
  if (name.common === "Czechia") name.common = "Czech Republic";

  const wikiCall = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${name.common}&formatversion=2&exsentences=4&exlimit=1&explaintext=1&origin=*`
  );
  const wikiData = await wikiCall.json();

  const [pages] = wikiData.query.pages;

  return [...basicInfoData, pages];
};

export const fetchLands = async (options) => {
  const call = await fetch("https://unpkg.com/world-atlas@2.0.2/countries-110m.json", options);
  const data = await call.json();

  return data;
};
