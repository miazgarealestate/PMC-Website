// PMC Build — service area map (Leaflet + CARTO dark basemap)
document.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('service-map');
  if (!el || typeof L === 'undefined') return;

  var map = L.map(el, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd', maxZoom: 14, minZoom: 6
  }).addTo(map);

  var bronze = '#c99a68';
  // Extended area (dashed outline)
  var ext = L.polygon([[48.995,-120.65],[48.995,-118.30],[49.45,-118.45],[49.85,-119.20],[49.95,-119.85],[49.70,-120.65]],
    { color: bronze, weight: 1.5, dashArray: '6 6', fillOpacity: 0.04, fillColor: bronze });
  // Core area (shaded)
  var core = L.polygon([[48.995,-120.05],[48.995,-118.85],[49.18,-118.85],[49.42,-119.25],[49.62,-119.50],[49.62,-119.78],[49.45,-120.02]],
    { color: bronze, weight: 2, fillOpacity: 0.30, fillColor: bronze });
  ext.addTo(map); core.addTo(map);

  var towns = [
    ['Osoyoos', 49.032, -119.468, true],
    ['Oliver', 49.182, -119.550, false, 'right'],
    ['Okanagan Falls', 49.347, -119.566],
    ['Penticton', 49.499, -119.594],
    ['Cawston', 49.188, -119.766, false, 'bottom'],
    ['Keremeos', 49.204, -119.830, false, 'left'],
    ['Rock Creek', 49.054, -119.000],
    ['Princeton', 49.459, -120.506],
    ['Grand Forks', 49.033, -118.440]
  ];
  towns.forEach(function (t) {
    var home = !!t[3];
    L.circleMarker([t[1], t[2]], {
      radius: home ? 8 : 5, color: '#0d0c0b', weight: 2,
      fillColor: bronze, fillOpacity: 1
    }).bindTooltip(t[0], { permanent: !(window.matchMedia('(max-width: 640px)').matches && (t[0]==='Princeton'||t[0]==='Grand Forks')), direction: t[4] || 'right', offset: t[4] === 'left' ? [-8, 0] : t[4] === 'bottom' ? [0, 8] : [8, 0], className: 'town' }).addTo(map);
  });

  var small = window.matchMedia('(max-width: 640px)').matches;
  map.fitBounds((small ? core : ext).getBounds(), { padding: small ? [10, 10] : [4, 4] });
});
