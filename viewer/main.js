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
  "Arçon": { coords: [6.3839249, 46.9453348] },
  "Luxembourg": { coords: [6.1308563, 49.6106593] },
  "Niederanven": { coords: [6.2437456, 49.6532855] },
  "Les Contamines": { coords: [6.7268638, 45.8221145] },
  "Versailles": { coords: [2.1105409, 48.8073645] },
  "Héron": { coords: [5.0976879, 50.5503393] },
};


const features = Object.values(locations).map(d =>
  new Feature({ geometry: new Point(fromLonLat(d.coords)) })
);

const pointsLayer = new VectorLayer({
  source: new VectorSource({ features: features }),
  style: new Style({
    image: new Circle({
      radius: 10,
      fill: new Fill({ color: 'red' }),
      stroke: new Stroke({ color: 'white', width: 2 })
    })
  }),
  minZoom: 0,
  maxZoom: 11,
});



const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
      minZoom: 0,
      maxZoom: 11,
    }),
    new TileLayer({
      source: new ImageTile({
        url:
          'https://raw.githubusercontent.com/jgaffuri/CartoHD_webmap/main/tiles/{z}/{x}/{y}.png',
        minZoom: 12,
        maxZoom: 18,
      }),
    }),
    pointsLayer,
  ],
  view: new View({
    center: [598290, 5357042],
    zoom: 17,
    minZoom: 1,
    maxZoom: 18,
  })
});



document.getElementById("location-menu").addEventListener("change", (event) => {
  const selectedIndex = event.target.value;
  if (!selectedIndex) return
  const location = locations[selectedIndex];
  map.setView(new View({
    center: fromLonLat(location.coords),
    zoom: 17
  }));
});



// set view from URL parameters
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('lon') && urlParams.get('lat') && urlParams.get('z')) {
  map.setView(new View({
    center: fromLonLat([+urlParams.get('lon'), +urlParams.get('lat')]),
    zoom: +urlParams.get('z')
  }));
}





// Function to update URL with lon, lat, and z
const updateURL = () => {
  const view = map.getView();
  const center = toLonLat(view.getCenter());
  const zoom = view.getZoom();

  const lon = center[0].toFixed(5);
  const lat = center[1].toFixed(5);

  const newURL = `${window.location.pathname}?lon=${lon}&lat=${lat}&z=${zoom}`;
  window.history.replaceState({}, '', newURL);
};

// Listen to changes in the map's view
const view = map.getView();
view.on('change:center', updateURL);
view.on('change:resolution', updateURL);

// Initial URL update
updateURL();

