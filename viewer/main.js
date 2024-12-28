import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ImageTile from 'ol/source/ImageTile.js';
import { fromLonLat } from 'ol/proj';




const locations = {
  "Paris": { coords: [2.3290438, 48.8629166] },
  "Marseille": { coords: [5.3744239, 43.2954564] },
  "Strasbourg": { coords: [7.7505894, 48.5818679] },
  "Arçon": { coords: [6.3839249, 46.9453348] },
  "Luxembourg": { coords: [6.1308563, 49.6106593] },
  "Niederanven": { coords: [6.2437456, 49.6532855] },
  "contas": { coords: [6.7268638, 45.8221145] },
};



const map = new Map({
  target: 'map',
  layers: [
    /*new TileLayer({
      source: new OSM()
    }),*/
    new TileLayer({
      source: new ImageTile({
        url:
          'https://raw.githubusercontent.com/jgaffuri/CartoHD_webmap/main/tiles/{z}/{x}/{y}.png',
      }),
    }),
  ],
  view: new View({
    center: [598290, 5357042],
    zoom: 19,
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
if(urlParams.get('lon') && urlParams.get('lat') && urlParams.get('z')) {
  map.setView(new View({
    center: fromLonLat([+urlParams.get('lon'), +urlParams.get('lat')]),
    zoom: +urlParams.get('z')
  }));
}

