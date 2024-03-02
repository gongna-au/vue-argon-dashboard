<template>
  <div class="card">
    <div class="card-header pb-0 px-3">
      <h6 class="mb-0">Detail Billing Reserve Information 已预定的停车场</h6>
    </div>
    <div class="card-body pt-4 p-3">
      <ul class="list-group">
        <li v-for="reserve in reserveList" :key="reserve.id" class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
          <div class="d-flex flex-column">
            <h6 class="mb-3 text-sm">{{ reserve.parking_lot_name }}</h6>
            <span class="mb-2 text-xs">
              Address: <span class="text-dark font-weight-bold ms-sm-2">{{ reserve.parking_lot_address }}</span>
            </span>
            <span class="mb-2 text-xs">
              Parking Spaces: <span class="text-dark ms-sm-2 font-weight-bold">{{ reserve.parking_lot_spaces }}</span>
            </span>
            <span class="mb-2 text-xs">
              Standard Charge: <span class="text-dark ms-sm-2 font-weight-bold">{{ reserve.parking_lot_charge }}</span>
            </span>
            <span class="mb-2 text-xs">
              Reservation Start: <span class="text-dark ms-sm-2 font-weight-bold">{{ reserve.start_time }}</span>
            </span>
            <span class="mb-2 text-xs">
              Reservation End: <span class="text-dark ms-sm-2 font-weight-bold">{{ reserve.end_time }}</span>
            </span>
            <span class="mb-2 text-xs">
              Vehicle Number: <span class="text-dark ms-sm-2 font-weight-bold">{{ reserve.vehicle_number }}</span>
            </span>
          </div>
         
          <div class="ms-auto text-end">
            <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;" @click="cancelReservation(reserve.id)">
              <i class="far fa-trash-alt me-2" aria-hidden="true"></i>Cancel
            </a>
            <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;" @click="showQrCode(reserve.id)">
              <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Show
            </a>
            <!-- 将模态框放在这里，为每个预定信息单独控制显示 -->
            <div v-if="reserve.showModal" class="modal-overlay" @click="hideModal(reserve.id)">
              <div class="modal-content" @click.stop>
                <span class="close-modal" @click="hideModal(reserve.id)">&times;</span>
                <div class="qr-code-container">
                  <img :src="`https://pic.616pic.com/ys_bnew_img/00/20/96/fRO0HKOZWx.jpg`" alt="QR Code" />
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  name: "billing-card",
  data() {
    return {
      reserveList: [],
      showModal: false, // 控制模态框是否显示
      currentReservationId: null, // 当前选中的预约ID
    };
  },
  async mounted() {
    await this.fetchParkingReserve();
  },
  methods: {
    showQrCode(reservationId) {
      this.reserveList = this.reserveList.map(item =>
        item.id === reservationId ? { ...item, showModal: true } : item
      );
    },
    hideModal(reservationId) {
      this.reserveList = this.reserveList.map(item =>
        item.id === reservationId ? { ...item, showModal: false } : item
      );
    },

    async fetchParkingReserve() {
      const userId = this.$store.state.userId; // 从store获取userId
      const url = `http://localhost:8083/api/v1/parking/reserve?userId=${userId}`;
      try {
        const response = await fetch(url);
        if (response.ok) {
          let { data } = await response.json();
          // 为每个预定信息添加showModal属性
          data = data.map(item => ({ ...item, showModal: false }));
          this.reserveList = data;
        } else {
          console.error('Failed to fetch parking reserve');
        }
      } catch (error) {
        console.error('Error fetching parking reserve:', error);
      }
    },
    async cancelReservation(reservationId) {
      // 调用API取消预定
      try {
        const response = await fetch(`http://localhost:8083/api/v1/parking/cancel?reserveId=${reservationId}`, { method: 'GET' });
        if (response.ok) {
          // 成功后从列表中移除这项预定
          this.reserveList = this.reserveList.filter(reserve => reserve.id !== reservationId);
          alert('Reservation cancelled successfully.');
        } else {
          console.error('Failed to cancel the reservation');
        }
      } catch (error) {
        console.error('Error cancelling reservation:', error);
      }
    },
   
  }
};
</script>

