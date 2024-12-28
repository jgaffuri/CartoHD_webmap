import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
//import OSM from 'ol/source/OSM';
import ImageTile from 'ol/source/ImageTile.js';


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
    zoom: 19
  })
});


