import './style.css';
import { Map, View, Feature } from 'ol';
import TileLayer from 'ol/layer/Tile';
//import OSM from 'ol/source/OSM';
import ImageTile from 'ol/source/ImageTile.js';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import { Style, Fill, Stroke, Circle } from 'ol/style';
//import CircleStyle from 'ol/style/Circle.js';

const locations = {
  "Paris": { coords: [2.3290438, 48.8629166] },
  "Marseille": { coords: [5.3744239, 43.2954564] },
  "Strasbourg": { coords: [7.7505894, 48.5818679] },
  "Arçon": { coords: [6.3839249, 46.9453348] },
  "Luxembourg": { coords: [6.1308563, 49.6106593] },
  "Niederanven": { coords: [6.2437456, 49.6532855] },
  "contas": { coords: [6.7268638, 45.8221145] },
  "Versailles": { coords: [2.1139099, 8.8065094] },
  "heron": { coords: [5.0976879, 50.5503393] },
};

const features = Object.values(locations).map(coord =>
  new Feature({ geometry: new Point(fromLonLat(coord)) })
);


/*
const pointStyle = new Style({
  image: new Circle({
    radius: 6,
    fill: new Fill({ color: 'red' }),
    stroke: new Stroke({ color: 'white', width: 2 })
  })
});*/


const vectorLayer = new VectorLayer({
  source: new VectorSource({ features: features }),
  //style: pointStyle
});



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
    vectorLayer,
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
if (urlParams.get('lon') && urlParams.get('lat') && urlParams.get('z')) {
  map.setView(new View({
    center: fromLonLat([+urlParams.get('lon'), +urlParams.get('lat')]),
    zoom: +urlParams.get('z')
  }));
}

