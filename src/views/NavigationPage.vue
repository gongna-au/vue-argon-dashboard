<template>
  <div class="container-fluid py-4">
    <div class="navigation-card card">
      <div class="card-header pb-0 px-3">
        <h6 class="mb-0">导航到停车场</h6>
      </div>
      <div class="card-body pt-4 p-3">
        <p>名称: {{ pname }}</p>
        <p>地址: {{ paddress }}</p>
        <p>距离: {{ parseFloat(pdistance).toFixed(2) }} km</p>
        <div id="map" style="height: 400px;"></div>
        <div class="text-center mt-3">
          <button @click="startNavigation" class="btn btn-success">开始导航</button>
        </div>
        <div class="text-center mt-3">
          <button @click="goBack" class="btn btn-primary">返回查找</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure leaflet CSS is also imported

export default {
  name: "navigation-page",
  props: {
    pname: String,
    paddress: String,
    pdistance: Number,
    platitude: Number,
    plongitude: Number
  },
  data() {
    return {
      map: null,
      marker: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([this.platitude, this.plongitude], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.marker = L.marker([this.platitude, this.plongitude]).addTo(this.map)
        .bindPopup(this.pname)
        .openPopup();
    },
    startNavigation() {
      // This method is supposed to simulate navigation. In a real application, you'd use a routing service.
      alert('开始导航模拟。在实际应用中，您需要集成真正的导航服务。');
      this.$router.push({ 
        name: 'MapWithOpenRouteService', 
        params: { 
          targetLatitude: this.platitude,
          targetLongitude:this.plongitude
        } 
      });
      // For demonstration, let's just pan the map to the destination.
      // this.map.panTo([this.platitude, this.plongitude]);
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
