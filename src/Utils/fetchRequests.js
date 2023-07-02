const fetchBasicInfo = async (id) => {
  // Kosovo has no ccn3 id
  // switch to cca3 id
  if (!id) id = "KOS";

  const basicInfoCall = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
  const basicInfoData = await basicInfoCall.json();

  return basicInfoData;
};

const fetchWiki = async (name) => {
  const wikiCall = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${name}`);
  const wikiData = await wikiCall.json();

  const { extract } = wikiData;

  return extract;
};

const fetchImages = async (name) => {
  const imagesRequest = await fetch(`https://api.unsplash.com/search/photos/?query=${name}&per_page=8`, {
    headers: {
      Authorization: `Client-ID ${import.meta.env.VITE_ACCESS_KEY}`,
    },
  });

  const images = await imagesRequest.json();

  return images;
};

export const makeInfoCall = async (id) => {
  const basicInfoData = await fetchBasicInfo(id);

  const { name } = basicInfoData[0];

  if (name.common === "DR Congo") name.common = "Democratic Republic of the Congo";
  if (name.common === "Czechia") name.common = "Czech Republic";

  const extract = await fetchWiki(name.common);
  const images = await fetchImages(name.common);

  return [...basicInfoData, { extract: extract }, images.results];
};

export const fetchLands = async (options) => {
  const call = await fetch("https://unpkg.com/world-atlas@2.0.2/countries-110m.json", options);
  const data = await call.json();

  return data;
};
