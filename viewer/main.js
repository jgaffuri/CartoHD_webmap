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
  "rouen": { coords: [1.0948423, 49.4402956,] },
  "grenoble": { coords: [5.7305424, 45.1925927] },
  "bourges": { coords: [2.399363, 47.0823153] },
  "nice": { coords: [7.2764335, 43.697657] },
  "caen": { coords: [-0.3632666, 49.1865856] },
  "banyuls": { coords: [3.130416, 42.4815943] },
  "reims": { coords: [4.0339443, 49.2537565] },
  "lezinnes": { coords: [4.0930535, 47.8020378] },
  "la_rochelle": { coords: [-1.1537987, 46.1558345] },
  "guillestre": { coords: [6.6263272, 44.6712091] },
  "hk": { coords: [7.3620651, 48.2365105] },
  "bordeaux": { coords: [-0.5749096, 44.8453942] },
  "lyon": { coords: [4.8322146, 45.7578678] },
  "crest": { coords: [5.021972, 44.7284722] },
  "clermont": { coords: [3.0858096, 45.7780322] },
  "montpellier": { coords: [3.8874967, 43.6082] },
  "nimes": { coords: [4.3594966, 43.8349092] },
  "arras": { coords: [2.7769919, 50.2911105] },
  "calais": { coords: [1.8543222, 50.9529371] },
  "amiens": { coords: [2.3010287, 49.8949548] },
  "bayonne": { coords: [-1.475217, 43.4900949] },
  "st_etienne": { coords: [4.3859732, 45.4412244] },
  "rocamadour": { coords: [1.616884, 44.799164] },
  "viaduc_millau": { coords: [3.0217457, 44.0853518] },
  "roscoff": { coords: [-3.9790599, 48.7230518] },
  "carlit": { coords: [1.93815, 42.57352] },
  "mont_louis": { coords: [2.11797, 42.50976] },
  "annecy": { coords: [6.12722, 45.89835] },
  "avoriaz": { coords: [6.77732, 46.18994] },
  "puy_dome": { coords: [2.96458, 45.77248] },
  "briancon": { coords: [6.64492, 44.89873] },
  "vitry": { coords: [2.39246, 48.78838] },
  "le_mans": { coords: [0.19389, 48.00597] },
  "auxerre": { coords: [3.57493, 47.79626] },
  "avignon": { coords: [4.8061048, 43.9525394] },
  "valence": { coords: [4.8885867, 44.9292393] },
  "tours": { coords: [0.693324, 47.3954014] },
//  "mulhouse": { coords: [0.19389, 48.00597] },  @47.7473761,7.3385146,46m/data

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
  center: fromLonLat([5.38487, 43.30026]),
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
        attributions: ['Map produced with <a href="https://github.com/jgaffuri/CartoHD/" target="_blank">CartoHD</a> !']
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


