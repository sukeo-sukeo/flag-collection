export const fetchCountryData = async (url, api) => await (await fetch(url + api)).json();

export const getRegions = (arry) => [
  ...new Set(arry.map((c) => c.region).filter((c) => c)),
];
export const getSubRegions = (arry) => [
  ...new Set(arry.map((c) => c.subregion).filter((c) => c)),
];