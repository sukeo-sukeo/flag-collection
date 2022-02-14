export const fetchCountryData = async (url) => await (await fetch(url + "all")).json();

export const getRegions = (arry) => [
  ...new Set(arry.map((c) => c.region).filter((c) => c)),
];
export const getSubRegions = (arry) => [
  ...new Set(arry.map((c) => c.subregion).filter((c) => c)),
];