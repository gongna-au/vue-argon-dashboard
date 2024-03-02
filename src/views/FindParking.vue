<template>
  <div class="container-fluid py-4">
    <!-- 搜索框 -->
    <!-- 停车场信息展示卡片 -->
    <div class="card">
      <div class="card-header pb-0 px-3">
        <h6 class="mb-0">附近停车场信息</h6>
      </div>
      <div class="card-body pt-4 p-3">
        <ul class="list-group">
          <li v-for="parking in parkingList" :key="parking.id" class="list-group-item border-0 d-flex mb-2 bg-gray-100 border-radius-lg">
            <div class="d-flex flex-column flex-grow-1">
              <h6 class="mb-3 text-sm">{{ parking.name }}</h6>
              <span class="mb-2 text-xs">地址: <span class="text-dark font-weight-bold ms-sm-2">{{ parking.address }}</span></span>
              <span class="mb-2 text-xs">剩余停车位: <span class="text-dark ms-sm-2 font-weight-bold">{{ parking.spaces }}</span></span>
              <span class="text-xs">标准收费: <span class="text-dark ms-sm-2 font-weight-bold">{{ parking.charge }}</span></span>
              <span class="text-xs">距离: <span class="text-dark ms-sm-2 font-weight-bold">{{ parking.distance.toFixed(2) }} km</span></span>
            </div>
            <div class="d-flex flex-column justify-content-between">
              <button @click="navigateTo(parking)" class="btn btn-primary mb-2">导航</button>
              <button @click="toggleReservationCard(parking)" class="btn btn-success">预定</button>
              <reservation-card v-if="parking.showReservationCard" :parkingId="parking.id" @cancel-reservation="hideReservationCard(parking)" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ReservationCard from "./components/ReservationCard.vue";

export default {
  components: {
    ReservationCard,
  },
  name: "find-parking",
  data() {
    return {
      parkingList: [],
      latitude: null,
      longitude: null,
      showReservationCard: false,
    };
  },
  mounted() {
    this.getUserLocation();
  },
  methods: {
    hideReservationCard(parking) {
      // 隐藏预定卡片
      parking.showReservationCard = false;
    },
    toggleReservationCard(parking) {
      // 切换当前点击的停车场的预定卡片显示状态
      parking.showReservationCard = !parking.showReservationCard;
      this.$emit('reservation-card', parking.id);
    },
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.fetchParkingSpots(); // 获取位置后立即搜索停车场
        }, (error) => {
          console.error('获取位置失败:', error);
        });
      } else {
        console.error('浏览器不支持地理位置服务');
      }
    },
    async fetchParkingSpots() {
       // 检查是否有缓存的停车场信息
      const cachedParkingList = localStorage.getItem('parkingList');
      if (cachedParkingList) {
        this.parkingList = JSON.parse(cachedParkingList);
        this.parkingList.forEach(parking => parking.showReservationCard = false); // 确保每个停车场对象都有这个属性
        return; // 如果有缓存，则直接使用，不再发起请求
      }
      const url = 'http://localhost:8083/api/v1/parking/search';
      try {
        //alert("Latitude: " + this.latitude + "\nLongitude: " + this.longitude);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
    
          body: JSON.stringify({
            latitude: this.latitude,
            longitude: this.longitude,
          }),
        });
        const res = await response.json();
        if (res.code==200) {
          this.parkingList = res.data; // 确保这里与响应结构匹配
        } else {
          console.error('无法获取停车场信息');
        }
      } catch (error) {
        console.error('请求停车场信息时发生错误:', error);
      }
    },
    navigateTo(parking) {
      // 实现导航逻辑，例如跳转到导航页面，并传递必要的停车场信息
      //console.log('开始导航到', parking.name);
      // 这里可以根据您的应用逻辑进行调整
      this.$router.push({
        name: 'NavigationPage', 
        params: { 
          pname: parking.name,
          paddress: parking.address,
          pdistance: parking.distance,
          platitude: parking.latitude,
          plongitude: parking.longitude
        } 
      });
    },
  }
};
</script>


