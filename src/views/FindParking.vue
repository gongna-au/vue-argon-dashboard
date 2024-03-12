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
              <button @click="navigateToUrl('https://maps.openrouteservice.org/#/directions/Residual%20Road,Kootenai%20County,ID,USA/North%20Latah%20Street,Rathdrum,ID,USA/data/55,130,32,198,15,97,4,224,38,9,96,59,2,24,5,192,166,6,113,0,184,64,90,1,25,8,13,128,58,1,216,5,96,25,130,146,0,224,19,128,38,0,25,152,96,22,42,1,162,226,153,6,36,104,50,162,196,91,46,36,168,146,96,27,136,169,50,76,217,177,162,66,133,13,13,73,113,111,208,110,194,53,9,173,33,45,67,16,188,64,64,0,234,158,4,68,216,114,128,5,229,0,45,174,66,6,65,237,160,32,0,205,224,0,109,209,112,64,66,161,81,240,1,221,145,194,1,172,144,1,204,109,3,161,208,67,208,115,16,192,162,240,115,33,189,189,209,17,97,209,96,64,1,124,234,128')"  class="btn btn-primary mb-2">导航</button>
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
    navigateToUrl(url) {
      window.location.href = url; // 设置目标URL，实现跳转
    },
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


