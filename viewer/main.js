import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ImageTile from 'ol/source/ImageTile.js';


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
  "Marseille": { coords: [-74.006, 40.7128] },
  "Strasbourg": { coords: [-0.1276, 51.5074] },
  "Arçon": { coords: [139.6917, 35.6895] },
};

document.getElementById("location-menu").addEventListener("change", (event) => {
  const selectedIndex = event.target.value;
  if (!selectedIndex) return
  const location = locations[selectedIndex];
  const view = map.getView();
  view.animate({
    center: location.coords,
    zoom: 10,
    duration: 1000,
  });
});

