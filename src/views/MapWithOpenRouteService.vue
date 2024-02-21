<template>
  <div id="map" style="height: 400px;"></div>
</template>
<script>
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'MapWithOpenRouteService',
  props: {
    targetLatitude: Number,
    targetLongitude: Number,
  },
  mounted() {
    this.getUserLocation();
  },
  methods: {
    async initMap(userPosition) {
      //alert("this.targetLatitude"+this.targetLatitude+ "this.targetLongitude"+this.targetLongitude)
      const map = L.map('map').setView([userPosition.lat, userPosition.lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Define coordinates for the request
      const coordinates = [
        [8.681495, 49.41461],
        [8.686507, 49.41943],
        [8.687872,49.420318]
      ];
      const apiUrl = 'https://api.openrouteservice.org/v2/directions/driving-car';
      const apiKey = '5b3ce3597851110001cf6248fa88cce10a984644b2e650a078e931bc';

      // Make the API request directly here
      try {
        //alert('777:'+ JSON.stringify({ coordinates: coordinates }))
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
            'Authorization': apiKey
          },
          body: JSON.stringify({ coordinates: coordinates })
        });
        const data = await response.json();
        if (!response.ok) {
          alert("metadata Error")
        }else{
          alert("metadata"+data.bbox)
        }
      } catch (error) {
        alert(`Error fetching directions: ${error}`); // Alert the error
      }
    },
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userPosition = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.initMap(userPosition);
          },
          (error) => {
            console.error('Error obtaining location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }
  }
};
</script>
