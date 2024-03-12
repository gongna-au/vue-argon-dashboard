<template>
  <div class="card">
    <div class="card-header pb-0 px-3">
      <h6 class="mb-0">Reservation Information 预定信息</h6>
    </div>

    <div class="card-body pt-4 p-3">
      <ul class="list-group">
        <!-- 你可以根据需要添加预定信息 -->
        <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
          <!-- 操作按钮，如取消预定等 -->
          <div class="d-flex flex-column mb-3">
            <label for="start-time" class="form-label">选择起始时间:</label>
            <input type="datetime-local" id="start-time" v-model="reservation.start_time" class="form-control">
          </div>
          <div class="d-flex flex-column mb-3">
            <label for="end-time" class="form-label">选择结束时间:</label>
            <input type="datetime-local" id="end-time" v-model="reservation.end_time" :min="reservation.start_time" class="form-control">
          </div>
        </li>
        <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
          <!-- 操作按钮，如取消预定等 -->
          <div class="col-12 mb-3">
            <label for="vehicle_number" class="form-label">输入车牌号:</label>
            <input type="password" id="vehicle_number" v-model="reservation.vehicle_number"  class="form-control">
          </div>     
        </li>
        <li class="list-group-item border-0 d-flex p-4 mb-2 border-radius-lg" style="background-color: transparent;">
          <!-- 操作按钮，如取消预定等 -->
          <button class="btn btn-success me-3" @click="submitReserve">预定</button> <!-- Bootstrap 5 的间距类 me-2 添加了右边距 -->
          <button class="btn btn-danger" @click="cancelPayment">取消</button>
        </li>
      </ul>
      <!-- 支付卡片 -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    parkingId: Number // 或 String，取决于你的 ID 类型
  },
  name: "reservation-card",
  components: {
  },
  // Props, data, methods等可以根据需要添加
  data() {
    return {
      reservation:{
        start_time: '',
        end_time: '',
        user_id:'',
        parking_lot_id:0,
        vehicle_number:'',
        status:'',
      },
      reservationDate: '',
      minDate: new Date().toISOString().split('T')[0],
      showPaymentCard: false,
      selectedBankCard: '',
      password: '',
      vehicle_number :'',
      bankCards: [], // 用于存储从后端获取的银行卡信息
    };
  },
  async mounted() {
    await this.fetchBankCards();
  },
  methods: {
    async fetchBankCards() {
      const userId = this.$store.state.userId;
      try {
        const response = await fetch(`http://localhost:8083/api/v1/user/cards?userId=${userId}`);
        const res = await response.json();
        if (res.code==200) {
          this.bankCards = res.data; // 更新cards数组
        } else {
          alert('获取绑定的银行卡信息失败')
        }
      } catch (error) {
        alert('获取绑定的银行卡信息异常')
        console.error('Error fetching bankCards:', error);
      }
    },
    cancelPayment(){
      this.$emit('cancel-reservation');
    },
    async submitReserve() {
      this.$emit('cancel-reservation');
      try {
        const userId = this.$store.state.userId; // 从store获取userId
        this.reservation.user_id=userId
        this.reservation.parking_lot_id=this.$props.parkingId
        this.reservation.status="PENDING"
        
        // 构建要发送的数据对象，排除phoneNumber
        const response = await fetch(`http://localhost:8083/api/v1/parking/reservation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 如果需要，添加其他必要的头部，如认证信息
          },
          body: JSON.stringify(this.reservation)
        });
        const res = await response.json();
        if (res.code!=200) {
          throw new Error('预定失败'+res.message);
        }
        // 更新成功，可以选择重新获取用户信息或直接更新视图
         alert("预定成功")
      } catch (error) {
        console.error("Error saving user profile:", error);
        alert('预定失败'); // 提示用户更新失败
      }
    },
    makeReserveRequest() {
      // 模拟后端预定请求
      console.log("Paying with", this.selectedBankCard, "and password", this.password);
      return new Promise(resolve => setTimeout(() => resolve('OK'), 1000));
    },
    resetForm() {
      this.showPaymentCard = false;
      this.selectedBankCard = '';
      this.password = '';
      this.vehicle_number='';
    }
  }
};
</script>
