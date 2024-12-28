import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ImageTile from 'ol/source/ImageTile.js';
import { fromLonLat, toLonLat } from 'ol/proj';


const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
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




const locations = {
  "Marseille": { coords: [43.2954564, 5.3744239] },
  "Strasbourg": { coords: [48.5818679, 7.7505894] },
  "Arçon": { coords: [46.9453348, 6.3839249] },
};

document.getElementById("location-menu").addEventListener("change", (event) => {
  const selectedIndex = event.target.value;
  if (!selectedIndex) return
  const location = locations[selectedIndex];
  map.setView(new View({
    center: fromLonLat(location.coords),
    zoom: 17
  }));
});

