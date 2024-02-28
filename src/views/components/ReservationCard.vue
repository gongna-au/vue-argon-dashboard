<template>
  <div class="card">
    <div class="card-header pb-0 px-3">
      <h6 class="mb-0">Reservation Information 预定信息</h6>
    </div>
    <div class="card-body pt-4 p-3">
      <ul class="list-group">
        <!-- 你可以根据需要添加预定信息 -->
        <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
          <div class="d-flex flex-column">
            <h6 class="mb-3 text-sm">Parking Lot Name</h6>
            <span class="mb-2 text-xs">Address: <span class="text-dark font-weight-bold ms-sm-2">Your Address Here</span></span>
            <!-- 更多信息 -->
          </div>
          <!-- 操作按钮，如取消预定等 -->
          <div class="d-flex flex-column mb-3">
              <label for="reservation-date" class="form-label">选择预定日期:</label>
              <input type="date" id="reservation-date" v-model="reservationDate" :min="minDate" class="form-control">
          </div>
        </li>
      </ul>
      <!-- 支付卡片 -->
      <div class="mt-4">
        <div class="card">
          <div class="card-body">
            <div class="mb-3">
              <label for="bank-card" class="form-label">选择银行卡:</label>
              <select id="bank-card" v-model="selectedBankCard" class="form-select">
                <option value="" disabled>请选择银行卡</option>
                <!-- 动态生成银行卡选项 -->
                <option v-for="(card, index) in bankCards" :key="index" :value="card">
                  **** **** **** {{ card.slice(-4) }}
                </option>
             </select>            
          </div>
             <div class="mb-3">
              <label for="password" class="form-label">输入银行卡密码:</label>
              <input type="password" id="password" v-model="password" class="form-control">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">输入车牌号:</label>
              <input type="password" id=" vehicle_number" v-model="vehicle_number" class="form-control">
            </div>
            <button class="btn btn-success" @click="submitReserve">预定</button>
            <button class="btn btn-danger" @click="cancelPayment">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "reservation-card",
  // Props, data, methods等可以根据需要添加
  data() {
    return {
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
      // 这里应该是发送请求到后端的函数
      const response = await this.makeReserveRequest();
      if (response === 'OK') {
        alert('支付成功！');
        // 清除或重置表单
        //this.resetForm();
        this.$emit('cancel-reservation');
      } else {
        alert('支付失败，请重试。');
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
