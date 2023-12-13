'use strict';

// Imports
import { onEvent, select } from './utils.js';

// Selections
const mapDiv = select('#map');

/* - - - - - MAIN CODE - - - - - */

mapboxgl.accessToken =
  'pk.eyJ1IjoiZ3VybGlua2F1ciIsImEiOiJjbHExYjM4cHUwNzE3MnBud25qNDlmc2VjIn0.Jeu9BD0h1vILAwXce8dQqw';

function getLocation(position) {
  let { latitude, longitude } = position.coords;

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [longitude, latitude], // starting position
    pitch: 40,
    zoom: 15, // starting zoom
  });
  new mapboxgl.Marker({ color: '#674cb5' })
    .setLngLat([longitude, latitude])
    .addTo(map);
}

function errorHandler() {
  mapDiv.style.backgroundColor = '#333';
  const errorMessage = document.createElement('p');
  errorMessage.innerText =
    'Please enable location services in your browser settings and try again.';
  errorMessage.classList.add('error-message');
  mapDiv.appendChild(errorMessage);
}

const options = {
  enableHighAccuracy: true,
};

if ('geolocation' in navigator) {
  const geo = navigator.geolocation;
  geo.getCurrentPosition(getLocation, errorHandler, options);
}
