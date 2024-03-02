<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Parking History</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Parking</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Vehicle Number</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Parking Duration</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Start & Time</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">End & Time</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> PaymentAmount </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="parking in parkingList" :key="parking.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img :src="'https://cdn.pixabay.com/photo/2014/04/02/10/45/parking-304465_1280.png'" class="avatar avatar-sm me-3" :alt="parking.name"/>
                  </div>
                 <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ parking.ParkingLotName }}</h6>
                    <p class="text-xs text-secondary mb-0">{{ parking.Address}}</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0 text-center ">{{ parking.VehicleNumber }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="text-secondary text-xs font-weight-bold">{{ parking.Duration }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{ parking.StartTime }}</span>
              </td>
              <td class="align-middle">
                <span class="text-secondary text-xs font-weight-bold">{{ parking.EndTime }}</span>
              </td>
              <td class="align-middle text-center ">
                <span class="text-secondary text-xs font-weight-bold ms-2">{{ parking. PaymentAmount  }}</span>
              </td>
     
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ParkingHistoryTable",
  data() {
    return {
      parkingList: [],
    };
  },
  mounted() {
    this.fetchParkingHistory();
  },
  methods: {
    async fetchParkingHistory() {
      const userId = this.$store.state.userId; // 从store获取userId
      const url = `http://localhost:8083/api/v1/parking/history?userId=${userId}`;
      try {
        const response = await fetch(url);
        if (response.ok) {
          const { data } = await response.json();
          this.parkingList = data; // 直接使用API返回的数据
        } else {
          console.error('Failed to fetch parking history');
        }
      } catch (error) {
        console.error('Error fetching parking history:', error);
      }
    },
    formatTime(isoString) {
      const date = new Date(isoString);
      return date.toLocaleString(); // 格式化为本地时间字符串
    },
  }
};
</script>