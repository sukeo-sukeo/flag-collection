export const createMarker = (L, country) => {
  // console.log(country);
  const displayName = country.translations.jpn ? country.translations.jpn.common : country.name.common;
  const m_options = {
    draggable: false
  }
  const t_options = {
    permanent: true
  }
  
  const marker = L.marker(country.latlng, m_options);
  marker.bindTooltip(displayName, t_options);
  
  return marker
}

export const onMapClick = () => {
  alert("onMapClick")
}

export const onMarkerClick = (e) => {
 return e.target._latlang
}