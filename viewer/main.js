import './style.css';
import { Map, View, Feature } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ImageTile from 'ol/source/ImageTile.js';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import { Style, Fill, Stroke, Circle } from 'ol/style.js';

const locations = {
  "Paris": { coords: [2.3290438, 48.8629166] },
  "Marseille": { coords: [5.3744239, 43.2954564] },
  "Strasbourg": { coords: [7.7505894, 48.5818679] },
  "Luxembourg": { coords: [6.1308563, 49.6106593] },
  "Niederanven": { coords: [6.23987, 49.65856] },
  "Arçon": { coords: [6.3839249, 46.9453348] },
  "Les Contamines": { coords: [6.7268638, 45.8221145] },
  "Versailles": { coords: [2.1105409, 48.8073645] },
  "Aigues-Mortes": { coords: [4.1901557, 43.5681482] },
  "Héron": { coords: [5.0976879, 50.5503393] },
  "Besançon": { coords: [6.0311831, 47.2328378] },
  "Lac Pavin": { coords: [2.888034, 45.4927152] },
  "Vianden": { coords: [6.2026872, 49.9349985] },
  "Cité Descartes": { coords: [2.5872958, 48.8413238] },
  "Toulouse sud": { coords: [1.478165, 43.5502836] },
  "Carcassonne": { coords: [2.3637022, 43.2064712] },
  "Mont Aiguille": { coords: [5.5505244, 44.8410252] },
  "Neuf-Brisach": { coords: [7.5282023, 48.0178219] },
  "La Capte": { coords: [6.1488792, 43.0589803] },
  "Solliès-Pont": { coords: [6.0335515, 43.1943149] },
  "Montagne Sainte-Victoire": { coords: [5.5674373, 43.5275541] },
  "Fougerolles": { coords: [6.4047287, 47.8861336] },
  "calanques": { coords: [5.4445471, 43.2119815] },
  "defense": { coords: [2.23749, 48.89249] },
  "ile_aix": { coords: [-1.17429, 46.01316] },
  "villandry": { coords: [0.51361, 47.33997] },
  "larzac": { coords: [3.316639, 43.9124679] },
  "mont_blanc": { coords: [6.8645688, 45.832667] },
  "toulouse": { coords: [1.4394938, 43.6018207] },
  "gavarnie": { coords: [-0.0084047, 42.695231] },
  "dune_pilat": { coords: [-1.2093208, 44.5999112] },
  "aix_en_pce": { coords: [5.4453353, 43.5262874] },
  "toulon": { coords: [5.9451519, 43.107892] },
  //"": { coords: [, ] },
};


const features = Object.values(locations).map(d =>
  new Feature({ geometry: new Point(fromLonLat(d.coords)) })
);

const pointsLayer = new VectorLayer({
  source: new VectorSource({ features: features }),
  style: new Style({
    image: new Circle({
      radius: 8,
      fill: new Fill({ color: 'blue' }),
      stroke: new Stroke({ color: 'white', width: 2 })
    })
  }),
  //minZoom: 0,
  maxZoom: 11,
});



const view = new View({
  center: [598290, 5357042],
  zoom: 18,
  minZoom: 1,
  maxZoom: 18,
})


const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
      //minZoom: 0,
      maxZoom: 13,
    }),
    new TileLayer({
      source: new ImageTile({
        url:
          'https://raw.githubusercontent.com/jgaffuri/CartoHD_webmap/main/tiles/{z}/{x}/{y}.png',
        minZoom: 12,
        maxZoom: 18,
        attributions: ['Map produced with <a href="https://github.com/jgaffuri/CartoHD/tree/main/src" target="_blank">CartoHD</a> !']
      }),
    }),
    pointsLayer,
  ],
  view: view
});


document.getElementById("location-menu").addEventListener("change", (event) => {
  const selectedIndex = event.target.value;
  if (!selectedIndex) return
  const location = locations[selectedIndex];
  view.setCenter(fromLonLat(location.coords));
  view.setZoom(18);
});



// set view from URL parameters
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('lon') && urlParams.get('lat') && urlParams.get('z')) {
  view.setCenter(fromLonLat([+urlParams.get('lon'), +urlParams.get('lat')]));
  view.setZoom(+urlParams.get('z'));
}





// Function to update URL with lon, lat, and z
const updateURL = () => {
  const zoom = view.getZoom().toFixed(2);
  const center = toLonLat(view.getCenter());
  const lon = center[0].toFixed(5);
  const lat = center[1].toFixed(5);

  const newURL = `${window.location.pathname}?lon=${lon}&lat=${lat}&z=${zoom}`;
  window.history.replaceState({}, '', newURL);
};

// Listen to changes in the map's view
view.on('change:center', updateURL);
view.on('change:resolution', updateURL);

// Initial URL update
updateURL();


