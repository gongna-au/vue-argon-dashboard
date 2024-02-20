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
        <!-- 给"开始导航"按钮设置绿色（成功） -->
          <button @click="goRun" class="btn btn-success">开始导航</button>
        </div>

        <div class="text-center mt-3">
          <!-- 给"返回查找"按钮设置蓝色（主要） -->
          <button @click="goBack" class="btn btn-primary" >返回查找</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // 确保也导入了leaflet的CSS

export default {
  name: "navigation-page",
  props: {
    pname: String,
    paddress: String,
    pdistance: Number,
    // 假设还传递了latitude和longitude作为停车场的位置
    platitude: Number,
    plongitude: Number
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const map = L.map('map').setView([this.platitude, this.plongitude], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([this.platitude, this.plongitude]).addTo(map)
        .bindPopup(this.pname)
        .openPopup();
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
