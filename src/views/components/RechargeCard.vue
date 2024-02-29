<template>
    <div class="card">
      <div class="card-header pb-0 px-3">
        <h6 class="mb-0">Recharge Information 充值信息</h6>
      </div>
      <div class="card-body pt-4 p-3">
        <!-- 银行卡选择 -->
        <div class="mb-3">
          <label for="selectedBankCard" class="form-label">选择银行卡:</label>
          <select id="selectedBankCard" v-model="selectedBankCard" class="form-control">
            <option disabled value="">请选择一张银行卡</option>
            <option v-for="card in bankCards" :key="card.id" :value="card.id">
              **** **** **** {{ card.number.slice(-4) }} ({{ card.bankName }})
            </option>
          </select>
        </div>
        <!-- 充值金额输入 -->
        <div class="mb-3">
          <label for="rechargeAmount" class="form-label">充值金额:</label>
          <input type="number" id="rechargeAmount" v-model="rechargeAmount" class="form-control" placeholder="请输入充值金额">
        </div>
        <!-- 充值操作按钮 -->
        <button class="btn btn-success" @click="submitRecharge">充值</button>
        <button class="btn btn-danger" @click="cancelRecharge">取消</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "recharge-card",
    data() {
      return {
        selectedBankCard: '',
        rechargeAmount: '',
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
          if (res.code == 200) {
            this.bankCards = res.data; // 更新cards数组
          } else {
            alert('获取绑定的银行卡信息失败');
          }
        } catch (error) {
          alert('获取绑定的银行卡信息异常');
          console.error('Error fetching bankCards:', error);
        }
      },
      async submitRecharge() {
        // 这里应该是发送请求到后端进行充值的函数
        console.log("Recharging with bank card ID:", this.selectedBankCard, "Amount:", this.rechargeAmount);
        // 假设充值请求成功
        alert('充值成功！');
        this.cancelRecharge();
      },
      cancelRecharge() {
        // 清除表单
        this.selectedBankCard = '';
        this.rechargeAmount = '';
        // 可能还需要关闭模态框或者导航到其他页面
      }
    }
  };
  </script>
  