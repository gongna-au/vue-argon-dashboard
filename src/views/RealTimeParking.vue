<template>
    <div id="map" class="map-container"></div>
  </template>
  
  <script>
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  
  export default {
    name: 'RealTimeParking',
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        const map = L.map('map').setView([51.505, -0.09], 13); // 设置地图中心和缩放级别
  
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(map);
  
        // 假设这是从后端获取的停车场数据
        const parkingSpots = [
          { name:"SpotHyper",lat: 51.505, lng: -0.09, availableSpots: 5 },
          { name:"SpotNorth",lat: 51.515, lng: -0.1, availableSpots: 3 },
          { name:"SpotSouth",lat: 51.525, lng: -0.11, availableSpots: 0 }, // 示例停车场已满
          { name:"SpotWest",lat: 51.525, lng: -0.17, availableSpots: 19 }, // 示例停车场已满
          { name:"SpotMount",lat: 51.525, lng: -0.18, availableSpots: 78 }, // 示例停车场已满
        ];
  
        // 在地图上为每个停车场添加标记
        parkingSpots.forEach(spot => {
          const marker = L.marker([spot.lat, spot.lng]).addTo(map);
          marker.bindPopup(`SpotName: ${spot.name} Available Spots: ${spot.availableSpots}`);
          
          // 自定义标记的图标，可以根据停车位的剩余数量更改颜色
          const icon = this.getCustomIcon(spot.availableSpots);
          marker.setIcon(icon);
        });
      },
      getCustomIcon(availableSpots) {
        return L.divIcon({
          className: 'custom-icon', // 自定义类名以便于样式的定制
          html: `<div style="background-color: ${availableSpots > 0 ? '#4CAF50' : '#F44336'}; color: white; padding: 5px; border-radius: 5px;">${availableSpots}</div>`, // 根据停车位数量变化背景颜色
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });
      }
    }
  };
  </script>
  
  <style>
  /* 必须设置地图容器的高度，否则地图不会显示 */
  .map-container {
    height: 500px;
  }
  </style>
  