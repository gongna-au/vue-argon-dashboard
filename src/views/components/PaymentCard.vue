<template>
  <div class="card mt-4">
    <div class="card-header pb-0 p-3">
      <div class="row">
        <div class="col-6 d-flex align-items-center">
          <h6 class="mb-0">Payment Method 付款方式</h6>
        </div>
        <div class="col-6 text-end">
          <argon-button color="dark" variant="gradient" @click="showAddCardForm = true">
          <i class="fas fa-plus me-2"></i>
            Add New Card
          </argon-button>
        </div>

        <!-- 添加银行卡的表单 -->
        <div v-if="showAddCardForm" class="mt-3">
          <div class="input-group mb-3">
            <input type="text" v-model="newCard.bankName" placeholder="Card Back" class="form-control">
          </div>
          <div class="input-group mb-3">
            <input type="text" v-model="newCard.cardNumber" placeholder="Card Number" class="form-control">
          </div>
          <div class="input-group mb-3">
            <input type="password" v-model="newCard.cardPassword" placeholder="Password" class="form-control">
          </div>
          <div class="input-group mb-3">
            <input type="text" v-model="newCard.expiryDate" placeholder="Expiry Date (YYYY-MM)" class="form-control">
          </div>
          <argon-button color="success" variant="gradient" @click="submitNewCard">
            Submit
          </argon-button>
          <argon-button color="danger" variant="gradient" @click="showAddCardForm = false">
            Cancel
          </argon-button>
        </div>
      
      </div>
    </div>
    <div class="card-body p-3">
      <div class="row">
        <div class="col-md-6 mb-md-0 mb-4" v-for="(card, index) in cards" :key="index" >
          <div
            class="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row"
          >
            <img class="w-10 me-3 mb-0" src="@/assets/img/logos/mastercard.png" alt="logo" />
            <h6 class="mb-0">
              ****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;{{ card.slice(-4) }}
            </h6>
            <i
              class="fas fa-pencil-alt ms-auto text-dark cursor-pointer"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title
              aria-hidden="true"
              data-bs-original-title="Edit Card"
              aria-label="Edit Card"
            ></i>
            <span class="sr-only">Edit Card</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import img1 from "@/assets/img/logos/mastercard.png";
import img2 from "@/assets/img/logos/visa.png";

export default {
  name: "payment-card",
  components: {
    ArgonButton,
  },
  data() {
    return {
      img1,
      img2,
      showAddCardForm: false, // 控制添加新卡表单的显示
      newCard: { // 新银行卡信息
        bankName: '', // 确保添加了bankName字段
        cardNumber: '',
        cardPassword: '',
        expiryDate: '',
      },
      cards: [],
    };
  },
  async mounted() {
    await this.fetchCards();
  },
  methods: {
    async fetchCards() {
      const userId = this.$store.state.userId;
      try {
        const response = await fetch(`http://localhost:8083/api/v1/user/cards?userId=${userId}`);
        const res = await response.json();
        if (res.code==200) {
          this.cards = res.data; // 更新cards数组
        } else {
          alert('获取绑定的银行卡信息失败')
        }
      } catch (error) {
        alert('获取绑定的银行卡信息异常')
        console.error('Error fetching cards:', error);
      }
    },
    async submitNewCard() {
      const userId = this.$store.state.userId; // 从全局store获取userId
      const cardData = {
      user_id: userId,
      card_number: this.newCard.cardNumber,
      card_password: this.newCard.cardPassword,
      bank_name: this.newCard.bankName,
      expiry_date: this.newCard.expiryDate,
    };
      try {
        const response = await fetch("http://localhost:8083/api/v1/user/card", { // 替换为你的后端接口地址
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cardData), // 使用用户填写的表单数据
          });
          const res = await response.json();
          if (response.ok) {
            alert('绑定银行卡成功 ' + res.code);
            this.cards.push(response.data);
            this.showAddCardForm = false;
            // 重置表单，包括移除用户ID
            this.newCard = { bankName: '', cardNumber: '', cardPassword: '', expiryDate: '' };
          } else {
            // 登录失败的处理逻辑，比如显示错误消息
            alert('绑定银行卡失败,响应状态: ' + res.message);
          }
      }catch (error) {
        // 网络或其他错误的处理逻辑
        alert('登录过程中发生错误：' + error.message);
      }
    
    },
  },
};
</script>
